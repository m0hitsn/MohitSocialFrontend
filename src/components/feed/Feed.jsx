import "./feed.css";
import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username ? await axios.get(baseurl + "/posts/profile/" + username) : await axios.get(`${baseurl}/posts/timeline/${user._id}`);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }
        fetchPosts();
        setRefresh(false);
    }, [username, user._id, refresh]);


    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share refresh={setRefresh} />}
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} refresh={setRefresh} />
                    ))
                }

            </div>
        </div>
    )
}

export default Feed;