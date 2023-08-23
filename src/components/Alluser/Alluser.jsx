import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Alluser = ({ user, currentUser, dispatch }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const [follow, setFollow] = useState(currentUser.Following.includes(user._id));
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const addFollowing = async () => {
        if (!follow) {
            // console.log("enter");
            await axios.put(baseurl + "/user/" + user._id + "/follow", { userId: currentUser._id })
            dispatch({ type: "Follow", payload: user._id })
        } else {
            await axios.put(baseurl + "/user/" + user._id + "/unfollow", { userId: currentUser._id })
            dispatch({ type: "Unfollow", payload: user._id })
        }
        setFollow(!follow);
    }


    return (
        <div className="sidebarFriend">
            <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "black" }} >
                <div className='sidebarFriendTop'>
                    <img src={user.ProfilePicture ? PF + "person/" + user.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" className="sidebarFriendImg"></img>
                    <span className="sidebarFriendName">{user?.username}</span>
                </div>
            </Link>
            <div className='sidebarFriendBottom'>
                <button className='sidebarFriendsFollowbtn' onClick={() => { addFollowing() }} style={{ backgroundColor: follow ? "gray" : "#1877f2" }}>
                    {follow ? "Remove" : "Follow"}
                </button>
            </div>
        </div>
    )
}
