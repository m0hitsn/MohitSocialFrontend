import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css"

const Conversation = ({ conversationUser, currentUser, index, clickedIndex, onClick }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friend, setfriend] = useState(null);
    const isMeClicked = index === clickedIndex;
    useEffect(() => {
        const getfriend = async () => {
            const friendId = await conversationUser.members.find((m) => m !== currentUser._id)
            const res = await axios.get(baseurl + "/user?userId=" + friendId);
            setfriend(res.data);
        }
        getfriend();
    }, [conversationUser, currentUser])
    return (
        <div className="conversation" onClick={onClick} style={{ backgroundColor: isMeClicked ? "#e7e5e5f4" : "white" }}>
            <div className="conversationWrapper">
                <img src={friend?.ProfilePicture ? PF + "person/" + friend.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" className="conversationImg" />
                <span className="conversationName">{friend?.username}</span>
            </div>
        </div>
    )
}

export default Conversation;