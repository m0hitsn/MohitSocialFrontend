import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

const ChatOnline = ({ onlineFriends, currentUserId, setCurrentchat }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriend, setOnlineFriend] = useState([]);

    useEffect(() => {
        const getfriends = async () => {
            const res = await axios.get(baseurl + "/user/friend/" + currentUserId);
            setFriends(res.data);
        }
        getfriends();
    }, [currentUserId])

    useEffect(() => {
        setOnlineFriend(friends.filter(f => onlineFriends.includes(f._id)))
    }, [onlineFriends, friends])

    const handleConversationClick = async (user) => {
        try {
            const res = await axios.get(`${baseurl}/conversation/find/${currentUserId}/` + user._id);
            setCurrentchat(res.data);
            if (res.data === null) {
                const res = await axios.post(baseurl + "/conversation/", { senderId: currentUserId, receiverId: user._id })
                setCurrentchat(res.data);
            }
        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="chatOnline">
            {onlineFriend.map((o, index) => {
                return (
                    <div className="chatOnlineFriend" key={index} onClick={() => handleConversationClick(o)}>
                        <div className="chatOnlineImgContainer">
                            <img src={o?.ProfilePicture ? PF + "person/" + o.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" className="chatOnlineImg" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o.username}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default ChatOnline;