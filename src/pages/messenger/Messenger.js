import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Message from "../../components/message/Message";
import Conversation from "../../components/coversation/Conversation"
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";
import Searchfriends from "../../components/search/Searchfriends";

const Messenger = () => {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [ArrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [Search, setSearch] = useState();
    const [foundFriend, setFoundFriends] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(null);
    const scrollref = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("wss://mohitsocialserver.onrender.com")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });

    }, []);

    useEffect(() => {
        ArrivalMessage && currentChat?.members.includes(ArrivalMessage.sender) && setMessages((prev) => [...prev, ArrivalMessage])
    }, [ArrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", onlineUsers => {
            setOnlineFriends(user.Following.filter((f) => onlineUsers.find((on) => on.userId === f)));
            setOnlineFriends(user.Followers.filter((f) => onlineUsers.find((on) => on.userId === f)));
        })
    }, [user])


    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const res = await axios.get(baseurl + "/conversation/" + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConversation();
    }, [user._id, currentChat]);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await axios.get(baseurl + "/message/" + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessage();
    }, [currentChat]);

    const HandleNewMessage = async (e) => {
        e.preventDefault();
        const AddNewMessage = {
            coversationId: currentChat?._id,
            sender: user._id,
            text: newMessage,
        };

        const receiverId = currentChat.members.find((member) => member !== user._id);
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });


        try {
            const res = await axios.post(baseurl + "/message/", AddNewMessage);
            setMessages([...messages, res.data])
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        scrollref.current?.scrollIntoView();
    }, [messages])

    useEffect(() => {
        const getfriends = async () => {
            const res = await axios.get(baseurl + "/user/friend/" + user._id);
            setFoundFriends(res.data);
        }
        getfriends();
    }, [user._id]);


    const click = (index) => {
        setClickedIndex(index);
    };
    const updateActive = (data) => {
        conversations.map((conv, index) => {
            if (conv._id === data._id) {
                setClickedIndex(index);
            }
            return (true);

        })
    }


    return (
        <div>
            <Topbar />
            <div className="messenger">
                <div className="messengerWrapper">
                    <div className="chatMenu">
                        <div className="chatMenuWrapper">
                            <input type="text" placeholder="Search for friends" className="chatMenuInput" onChange={(e) => setSearch(e.target.value)} defaultValue={Search} />
                            {Search && <div className="foundFriend">
                                <Searchfriends Alluser={foundFriend} SearchItem={Search} setSearch={setSearch} messenger={true} setCurrentchat={setCurrentChat} currentUserId={user._id} onClicked={updateActive} />
                            </div>}

                            <div className="chatMenuBottom">
                                {conversations.map((c, index) => {
                                    return (
                                        <div onClick={() => { setCurrentChat(c); }} key={c._id} >
                                            <Conversation conversationUser={c} currentUser={user} index={index} clickedIndex={clickedIndex} onClick={() => click(index)} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="vl"></div>
                    <div className="chatBox">
                        <div className="chatBoxWrapper">
                            {currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map((m, index) => {
                                            return (
                                                <div ref={scrollref} key={index}>
                                                    <Message message={m} own={m.sender === user._id} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className="chatMessageInput" placeholder="write something ... " onChange={(e) => setNewMessage(e.target.value)} value={newMessage} ></textarea>
                                        <button className="chatSubmitButton" onClick={HandleNewMessage}>Send</button>
                                    </div>

                                </>
                                : <span className="noConversationText">Open a conversation to start a chat.</span>}
                        </div>
                    </div>
                    <div className="vl"></div>
                    <div className="chatOnline">
                        <div className="chatOnlineWrapper">
                            <ChatOnline onlineFriends={onlineFriends} currentUserId={user._id} setCurrentchat={setCurrentChat} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messenger;
