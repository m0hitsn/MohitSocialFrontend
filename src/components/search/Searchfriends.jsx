import React from 'react'
import "./search.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Searchfriends = ({ SearchItem, Alluser, messenger, setCurrentchat, currentUserId, setSearch, onClicked }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const FoundUser = Alluser.filter((u) => {
        return u.username.includes(SearchItem);
    });
    const handleConversationClick = async (user) => {
        try {
            const res = await axios.get(`${baseurl}/conversation/find/${currentUserId}/` + user._id);
            setCurrentchat(res.data);
            if (res.data === null) {
                const res = await axios.post(baseurl+"/conversation/", { senderId: currentUserId, receiverId: user._id })
                setCurrentchat(res.data);
            }
            onClicked(res.data);
        } catch (err) {
            console.log(err);
        }
        setSearch("");
    }

    return (
        <div className='FoundFriend'>
            {
                FoundUser.map((fu) => {
                    return (
                        <div className='searchfriendBar' key={fu._id}>
                            <Link to={messenger ? `/messenger` : `/profile/${fu.username}`} style={{ textDecoration: "none" }}>
                                <div className='searchfriendBarWrapper' onClick={() => { messenger ? handleConversationClick(fu) : setSearch("") }}>
                                    <img className='searchfriendImg' src={fu?.ProfilePicture ? PF + "person/" + fu.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" />
                                    <span className='searchfriendName'>{fu.username}</span>
                                </div>
                            </Link>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Searchfriends;