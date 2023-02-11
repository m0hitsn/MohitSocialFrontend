import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons"
import { AuthContext } from "../../context/AuthContext";

const Rightbar = ({ user }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentuser, dispatch } = useContext(AuthContext);
    function HomeRightbar() {
        return (
            <div>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}/post/gift.png`} alt=""></img>
                    <span className="birthdayText"><b>Mohit</b> and <b>3 other friends</b> have a birthday Today</span>
                </div>
                <img className="rightbarAd" src={`${PF}/post/ad.jpg`} alt=""></img>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online onlineUser={u} key={u.id} />
                    ))}
                </ul>
            </div>
        )
    }
    function ProfileRightbar() {
        const [friends, setfriends] = useState([]);
        const [follow, setFollow] = useState(currentuser.Following.includes(user._id));
        useEffect(() => {
            const fetchUserFriend = async () => {
                if (user?._id) {
                    const res = await axios.get(baseurl + "/user/Following/" + user._id);
                    setfriends(res.data);
                }
            }
            fetchUserFriend();
        }, [follow]);
        const followhandler = async () => {
            if (!follow) {
                await axios.put(baseurl + "/user/" + user._id + "/follow", { userId: currentuser._id })
                dispatch({ type: "Follow", payload: user._id })
            } else {
                await axios.put(baseurl + "/user/" + user._id + "/unfollow", { userId: currentuser._id })
                dispatch({ type: "Unfollow", payload: user._id })
            }
            setFollow(!follow);
        }
        return (
            <div>
                {user._id !== currentuser._id &&
                    <button className="rightbarfollowbutton" onClick={followhandler}>
                        {follow ? "Unfollow" : "follow"}
                        {follow ? <Remove /> : <Add />}
                    </button>
                }
                {user._id === currentuser._id &&
                    <button className="rightbarfollowbutton" onClick={() => {
                        localStorage.removeItem("MohitSocialUserId");
                        window.location.reload();
                    }}>Sign out</button>
                }

                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoKey">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoKey">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoKey">{user.relationship}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => {
                        return (
                            <Link to={"/profile/" + friend.username} key={friend._id} style={{ textDecoration: "none" }}>
                                <div className="rightbarFollowing" >
                                    <img src={friend.ProfilePicture ? PF + "person/" + friend.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" className="rightbarFollowingImg"></img>
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        );

                    })}
                </div>

            </div>
        )
    }
    return (
        <div className={user ? "Profilerightbar rightbar" : "Homerightbar rightbar"}>
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}

export default Rightbar;