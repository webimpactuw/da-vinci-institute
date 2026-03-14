/*Mahika Bagri*/
/*March 6 2026*/

/* 
Key: 
_ = TODO 
Framework Finished 
Graphics/CSS Needed
Feel Free to Change Tags/ClassNames 
Account Form not yet Integrated into Website 
Remember Me/Forgot Password not Implemented 
Error Throwing implemented Differently from HiFi 
*/ 

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(){
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSignUp = async (e) => {
        e.preventDefault()

        try{
            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            
            const data = await res.json();

            if (!res.ok) {
                setError(data.detail||"Something went wrong");
            return;
            }
            setError("");
            Username("");
            Password("");
            PasswordVerify("");
        } catch (errors) {
            setError("Servers Unreachable. Try again later.")
        }
    };

    const handleLogIn = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch(`${API_URL}/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            
            const data = await res.json();

            if (!res.ok) {
                setError(data.detail||"Something went wrong");
            return;
            }

            localStorage.setItem("token", data.access_token);
            /*router.push("_");*/
            setError("");
            Username("");
            Password("");
        } catch (errors) {
            setError("Servers Unreachable. Try again later.")
        }

    };

    const [username, Username] = useState("");
    const [password, Password] = useState("");
    const [passwordVerify, PasswordVerify] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(false)

        return(
        <main
            style={{
                /*
                backgroundImage: "url('/_.png')",
                backgroundSize: "fill",
                backgroundPosition: "center",
                */
            }}
        >
            { isLogin && (
                <div style=/*{{ padding: _, maxWidth: "_px", margin: "_" }}*/>
                    <header>
                        <h1>Welcome Back!</h1>
                        <h6>Login to Your Account</h6>
                    </header>
                    <h5>Username</h5>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => Username(e.target.value)}
                        /* className = "_" */
                        required
                    />
                    <h5>Password</h5>
                    <input
                    style={{ 
                        /* marginTop: "_px",*/
                    }}   
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => Password(e.target.value)}
                        /* className = "_" */
                        required
                    />
                    <button 
                        /* className = "_" */
                        onClick={handleLogIn}>
                            <div className = "Tagline">
                                Log In
                            </div>
                    </button>
                    <p>Don't have an account?</p>
                    <span
                        onClick = {() => {
                            setIsLogin(isLogin => !isLogin)
                        }}
                        style={{ color: "green", cursor: "pointer" }}
                        >
                        Sign Up
                    </span>
                </div>
            )}
            { !isLogin && (
                <div style=/*{{ padding: _, maxWidth: "_px", margin: "_" }}*/>
                    <header>
                        <h1>Create an Account</h1>
                    </header>
                    <h5>Username</h5>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => Username(e.target.value)}
                        /* className = "_" */
                        required
                    />
                    <h5>Choose a Password</h5>
                    <input
                    style={{ 
                        /* marginTop: "_px",*/
                    }}   
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => Password(e.target.value)}
                        /* className = "_" */
                        required
                    />
                    <h5>Verrify Password</h5>
                    <input
                    style={{ 
                        /* marginTop: "_px",*/
                    }}   
                        type="password"
                        placeholder="Password"
                        value={passwordVerify}
                        onChange={(e) => PasswordVerify(e.target.value)}
                        /* className = "_" */
                        required
                    />
                    <button 
                        style={{
                            opacity: password !== passwordVerify? .5:1
                        }}
                        disabled={password !== passwordVerify}
                        /* className = "_" */
                        onClick={handleSignUp}>
                            <div className = "Tagline">
                                Sign Up
                            </div>
                    </button>
                    <p>Already have an account?</p>
                    <span
                        onClick = {() => {
                            setIsLogin(isLogin => !isLogin)
                        }}
                        style={{ color: "green", cursor: "pointer" }}
                        >
                        Login
                    </span>
                </div>
                )}
            {error && (
                <div /* className = "_" */>
                    {error}
                </div>
            )}
        </main>
    );
}
