import React, { useContext, useEffect, useState } from 'react'
import "./profile.css";
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import { useParams } from "react-router";
import axios from 'axios';
import { Add } from '@material-ui/icons';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const [isShown, setIsShown] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let { username } = useParams();
    const { user: currentuser, dispatch } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            const res = await axios.get(`${baseurl}/user?username=${username}`)
            setUser(res.data);
        }
        fetchUserProfile();
    }, [username, refresh]);

    const uploadfileHandler = async (uploadProfile) => {
        let filename;
        const updateImg = {
            userId: currentuser._id,
        }
        if (uploadProfile) {
            const data = new FormData();
            filename = Date.now() + uploadProfile.name;
            data.append('name', filename);
            data.append('file', uploadProfile);

            updateImg.ProfilePicture = filename;
            try {
                await axios.post(baseurl+"/profileImg", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.put(`${baseurl}/user/${user._id}`, updateImg);
            dispatch({ type: "updateProfile", payload: filename })
        } catch (error) {
            console.log(error);
        }
        setRefresh(true);
    }

    return (
        <div>
            <Topbar setIsShown={setIsShown} />
            <div className='profile'>
                <div className={isShown ? "" : "hide"}>
                    <Sidebar />
                </div>
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profileCover'>
                            <img className='profileCoverImg' alt='' src={user.CoverPicture ? PF + user.CoverPicture : PF + "person/blankCover.jpg"}></img>
                            <img crossorigin="anonymous" className='profileUserImg' alt='' src={user.ProfilePicture ? PF + "person/" + user.ProfilePicture : PF + "person/BlankProfilePicture.jpg"}></img>
                            {user._id === currentuser._id &&
                                <label htmlFor='updateProfile' >
                                    <Add className='uploadProfileImg' />
                                    <input style={{ display: "none" }} type="file" id="updateProfile" accept=".jpg,.png,.jpeg" maxLength="1" onChange={(e) => { uploadfileHandler(e.target.files[0]) }} />
                                </label>
                            }

                        </div>
                        <div className='profileInfo'>
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.disc}</span>
                        </div>
                    </div>
                    <div className='profileRightBottom'>
                        <Feed username={username} />
                        <Rightbar user={user} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;