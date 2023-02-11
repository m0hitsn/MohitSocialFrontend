import React, { useRef, useContext } from 'react'
import "./Register.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import logincall from "../../Apicalls";


const Register = () => {
    const baseurl = process.env.REACT_APP_BASE_URL;
    let { dispatch } = useContext(AuthContext);
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
                <Navigate to="/" />
                logincall({ email: email.current.value, password: password.current.value }, dispatch);
            } catch (error) {
                console.log(error);
            }
        }

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