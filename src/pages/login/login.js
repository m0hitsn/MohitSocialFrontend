import React, { useRef } from 'react'
import logincall from "../../Apicalls";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    function clickHandler(e) {
        e.preventDefault();
        logincall({ email: email.current.value, password: password.current.value }, dispatch);
    }
    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>MohitSocial</h3>
                    <span className='loginDesc'>Connect with friends and world around you on MohitSocial</span>

                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={clickHandler}>
                        <input type="email" placeholder="Email" className="loginInput" ref={email} required></input>
                        <input type="password" placeholder="Password" className="loginInput" minLength="6" ref={password} required></input>
                        <button className='loginButton'>{isFetching ? <CircularProgress size={20} style={{ color: "white" }} /> : "Log In"}</button>
                        <span className='loginForgot'>Forgot Password</span>

                        <Link to="/register" >
                            <button className='loginRegisterButton'>{isFetching ? <CircularProgress size={20} style={{ color: "white" }} /> : "Create a New Account"}</button>
                        </Link>
                    </form>
                </div>

            </div>

        </div>
    )
}
export default Login;