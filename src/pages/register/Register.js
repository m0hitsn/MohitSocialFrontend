import React, { useRef } from 'react'
import "./Register.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();;
    const baseurl = process.env.REACT_APP_BASE_URL;
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const clickHandler = async (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post(baseurl + "/auth/register", user);
            } catch (error) {
                console.log(error);
            }
        }
        
        navigate("/");
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
                        <input type="text" placeholder="Username" className="loginInput" ref={username} required></input>
                        <input type="email" placeholder="Email" className="loginInput" ref={email} required></input>
                        <input type="password" placeholder="Password" className="loginInput" ref={password} required></input>
                        <input type="password" placeholder="Password Again" className="loginInput" ref={passwordAgain} required></input>
                        <button className='loginButton' type='submit'>Sign Up</button>
                        <Link to="/login">
                            <button className='loginRegisterButton'>Login Into Your Account</button>
                        </Link>
                    </form>
                </div>

            </div>

        </div>
    )
}
export default Register;