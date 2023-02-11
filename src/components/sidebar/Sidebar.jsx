import "./sidebar.css";
import { RssFeed, Chat, PlayCircle, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from "@mui/icons-material";
import { Alluser } from "../Alluser/Alluser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Sidebar = () => {
  const baseurl = process.env.REACT_APP_BASE_URL
  const { user, dispatch } = useContext(AuthContext);
  const [allUser, setallUser] = useState([]);

  useEffect(() => {
    const getallUser = async () => {
      const res = await axios.get(baseurl+"/user/notfriend/" + user._id);
      setallUser(res.data);
    }
    getallUser();
  }, [user._id]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>


        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"></hr>


        <div className="sidebarFriendList">
          <h4 className="sidebarFriendListHeading">Recommended Users</h4>
          {allUser.map((u, indx) => (
            <Alluser user={u} key={indx} currentUser={user} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </div>

  )
}

export default Sidebar;