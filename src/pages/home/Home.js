import React, { useState } from 'react'
import "./home.css";
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';


const Home = () => {
    const [isShown, setIsShown] = useState(false);
    return (
        <div className='Home'>
            <Topbar setIsShown={setIsShown} />
            <div className='Homecontainer'>
                <div className={isShown ? "" : "hide"}>
                    <Sidebar />
                </div>
                <Feed />
                <Rightbar />
            </div>
        </div>
    )
}

export default Home;