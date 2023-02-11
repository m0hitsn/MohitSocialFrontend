import "./message.css";
import { format } from "timeago.js"
import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Message = ({ own, message }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const [user, setUser] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(baseurl + "/user?userId=" + message.sender);
            setUser(res.data);
        }
        getUser();
    }, [message])
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={user?.ProfilePicture ? PF + "person/" + user.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" />
                <span className="messageText">{message.text}</span>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>

        </div>
    )
}

export default Message;