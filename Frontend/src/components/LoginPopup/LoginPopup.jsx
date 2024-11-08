import React, { useState, useContext } from 'react';
import "./LoginPopup.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({ name: "", email: "", password: "" });

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login/register:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} method="POST" className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input value={data.name} onChange={onchangeHandler} name="name" type="text" placeholder='Your Name..' required />
                    )}
                    <input name="email" value={data.email} onChange={onchangeHandler} type="email" placeholder='Your Email...' required />
                    <input name="password" value={data.password} onChange={onchangeHandler} type="password" placeholder='Password...' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By Continuing, I agree with the terms of use & privacy policy</p>
                </div>
                {currState === "Login" ?
                    <p>Create new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span> </p> :
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
            </form>
        </div>
    );
};

export default LoginPopup;
