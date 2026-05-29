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

import InputField from "@/components/InputField";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(){
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSignUp = async (e) => {
        e.preventDefault()
        if(!checkPassword()){
            return;
        }

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
                setErrors(data.detail||"Something went wrong");
                return;
            }
            setErrors([]);
            setUsername("");
            setPassword("");
            setPasswordVerify("");
        } catch (errors) {
            setErrors(...errors, ["Servers Unreachable. Try again later."])
        }
    };

    const checkPassword = () => {
        if(password !== passwordVerify){
            setErrors(...errors, "Passwords do not match");
            return false;
        }
        if(password.length < 8){
            setErrors(...errors, "Password must be at least 8 characters long");
            return false;
        }
        if(!/\d/.test(password)){
            setErrors(...errors, "Password must contain at least one number");
            return false;
        }
        return true;
      }

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
                setErrors(data.detail||"Something went wrong");
                return;
            }

            localStorage.setItem("token", data.access_token);
            /*router.push("_");*/
            setErrors([]);
            setUsername("");
            setPassword("");
        } catch (errors) {
            setErrors(...errors, ["Servers Unreachable. Try again later."])
        }

    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLogin, setIsLogin] = useState(false)

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrors([]);
    }

    return(
        <main>
            { isLogin && (
                <div className="h-full">
                  <form className="flex flex-col justify-center items-center gap-6 w-1/4 p-4 pt-20 pb-20 rounded-4xl bg-[#eaf3fa] text-[#000105] fixed top-[150px] right-[calc(20%)]">
                    <h1 className="text-3xl font-semibold mb-3">Welcome Back!</h1>
                    <p>Login to your account</p>

                    <InputField
                      label="Username"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />

                    <InputField
                      label="Password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />

                    <button className="bg-[#387333] rounded-4xl p-2 w-1/2 text-white mt-7" type="submit" onClick={handleLogIn}>Login</button>
                    <p>Don&apos;t have an account? <button className="text-[#387333] font-semibold" onClick={toggleForm}> Sign up</button>
                    </p>
                  </form>
                </div>
            )}
            { !isLogin && (
                <div className="h-full">
                  <form className="flex flex-col justify-center items-center gap-6 w-1/4 p-4 pt-20 pb-20 rounded-4xl bg-[#eaf3fa] text-[#000105] fixed top-[150px] right-[calc(20%)]">
                    <h1 className="text-3xl font-semibold mb-3">Create an Account</h1>

                    <InputField
                      label="Username"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />

                    <InputField
                      label="Password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />

                    <InputField
                      label="Confirm Password"
                      type="password"
                      id="confirm"
                      name="confirm"
                      placeholder="Confirm Password"
                      onChange={(e) => setPasswordVerify(e.target.value)}
                      value={passwordVerify}
                    />

                    <button className="bg-[#387333] rounded-4xl p-2 w-1/2 text-white mt-7" type="submit" onClick={handleSignUp}>Sign Up</button>
                    <p>Already have an account? <button className="text-[#387333] font-semibold" onClick={toggleForm}> Log In</button>
                    </p>
                  </form>
                </div>
                )}
            {errors && (
                <div>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index} className="text-red-500">
                                {error}
                            </li>
                        ))}
                    </ul>
                    
                </div>
            )}
        </main>
    );
}
