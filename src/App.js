import React, { useContext } from 'react';
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import Messenger from './pages/messenger/Messenger';
import { AuthContext } from './context/AuthContext';
import "./app.css";

function App() {
    let { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={user ? <Home /> : <Login />}></Route>
                <Route path='/profile/:username' element={!user ? <Navigate to="/" /> : <Profile />}></Route>
                <Route path='/login' element={user ? <Navigate to="/" /> : <Login />}></Route>
                <Route path='/register' element={user ? <Navigate to="/" /> : <Register />}></Route>
                <Route path='/messenger' element={!user ? <Navigate to="/" /> : <Messenger />} ></Route>
            </Routes>
        </BrowserRouter>

    );
}
export default App;

