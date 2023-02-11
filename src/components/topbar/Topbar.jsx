import React, { useEffect, useState } from 'react'
import "./topbar.css";
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Searchfriends from '../search/Searchfriends';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const Topbar = ({ setIsShown }) => {
    const baseurl = process.env.REACT_APP_BASE_URL
    const { user } = useContext(AuthContext);
    const [alluser, setAllUser] = useState();
    const [searchItem, setSearchItem] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchfriends = async () => {
            try {
                const res = await axios.get(baseurl + "/user/search/");
                setAllUser(res.data);
            } catch (error) { }
        }
        fetchfriends();
    }, [])


    return (
        <div className='topbarContainer'>
            <DensityMediumIcon className='sidebarShowAndHide' onClick={() => setIsShown(isShown => !isShown)} />
            <div className='topbarLeft'>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className='logo'>MohitSocial</span>
                </Link>
            </div>
            <div className='topbarCenter'>
                <div className='Searchbar'>
                    <Search className='searchIcon' />
                    <input placeholder="Search for friends, posts, videos" className='searchInput' onChange={(e) => setSearchItem(e.target.value)} defaultValue={searchItem}></input>
                </div>
                {searchItem &&
                    <div className="searchfriend">
                        <Searchfriends Alluser={alluser} SearchItem={searchItem} setSearch={setSearchItem} />
                    </div>
                }
            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        <span className='topbarLink'>Homepage</span>
                    </Link>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "white" }}>
                        <span className='topbarLink Timeline'>Timeline</span>
                    </Link>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Person />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Link to="/messenger" style={{ color: "white" }}>
                            <Chat />
                            <span className='topbarIconBadge'>4</span>
                        </Link>
                    </div>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbarIconBadge'>3</span>
                    </div>
                </div>
                <Link to={"/profile/" + user.username}>
                    <img src={user.ProfilePicture ? PF + "person/" + user.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" className='topbarImg'></img>
                </Link>
            </div>
        </div>
    );
}

export default Topbar;