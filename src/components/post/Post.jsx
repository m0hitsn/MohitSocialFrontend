import "./post.css";
import React, { useContext, useState } from "react";
import { MoreVert } from '@mui/icons-material';
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"

function Post({ post, refresh }) {
    const baseurl = process.env.REACT_APP_BASE_URL
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.like.length);
    const [isliked, setIsLiked] = useState(false);
    const [user, setUser] = useState([]);
    const [optionVisibility, setoptionVisibility] = useState(false);
    const { user: currentuser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.like.includes(currentuser._id));
    }, [post.like, currentuser._id]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${baseurl}/user?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    function likeHandler() {
        setLike(isliked ? like - 1 : like + 1);
        setIsLiked(!isliked);
        try {
            axios.put(baseurl + "/posts/" + post._id + "/like", { userId: currentuser._id });
        } catch (error) {
            console.log(error);

        }

    }
    const deletePostHandler = async () => {
        await axios.delete(baseurl + "/posts/" + post._id, { data: { userId: currentuser._id } });

    }
    return (
        <div className="Post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={"/profile/" + user.username} style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}>
                            <img className="postProfileImg" alt="" src={user.ProfilePicture ? PF + "person/" + user.ProfilePicture : PF + "person/BlankProfilePicture.jpg"}></img>
                            <span className="postUsername">{user.username}</span>
                        </Link>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className="MoreVert" onClick={() => setoptionVisibility(!optionVisibility)} />
                        {optionVisibility && <ul className="options">
                            <li className="option" onClick={() => { deletePostHandler(); refresh(true) }}>Delete Post</li>
                        </ul>}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.disc}</span>
                    <img className="postImg" src={post.img && PF + post.img} alt=""></img>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className={isliked ? "likeIcon like" : "likeIcon"} src={PF + "/like.png"} onClick={likeHandler} alt=""></img>
                        <img className={isliked ? "likeIcon heart" : "likeIcon"} src={PF + "/heart.png"} onClick={likeHandler} alt=""></img>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Post;