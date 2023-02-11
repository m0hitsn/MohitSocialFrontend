import React from 'react'

const Online = ({ onlineUser }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" alt="" src={onlineUser?.profilePicture ? PF + onlineUser.profilePicture : PF + "person/BlankProfilePicture.jpg"}></img>
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{onlineUser.username}</span>
        </li>
    )
}

export default Online