/*Mahika Bagri*/
/*May 18 2026*/

"use client";

import InputField from "@/components/InputField";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "@/node_modules/next/navigation";
import { signUpUser, logInUser } from "@/api/authService";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!checkPassword()) return;

    try {
      await signUpUser(username, password);
      router.push("/courses");

      setErrors([]);
      setUsername("");
      setPassword("");
      setPasswordVerify("");
    } catch (err) {
      console.error("Signup fetch error:", err);
      setErrors([err.message || "Servers Unreachable. Try again later."]);
    }
  };

  const checkPassword = () => {
    setErrors([]);
    if (password !== passwordVerify) {
      setErrors(["Passwords do not match"]);
      return false;
    }
    if (password.length < 8) {
      setErrors(["Password must be at least 8 characters long"]);
      return false;
    }
    if (!/\d/.test(password)) {
      setErrors(["Password must contain at least one number"]);
      return false;
    }
    return true;
  }

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      await logInUser(username, password);
      router.push("/courses");

      setErrors([]);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Login fetch error:", err);
      setErrors([err.message || "Servers Unreachable. Try again later."]);
    }
  };

  useEffect(() => {
    const value = params.get("isLogin");
    setIsLogin(value === "true");
    setErrors([]);
  }, [params]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLogin, setIsLogin] = useState(false)

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors([]);
  }

  return (
    <main
      style={{
        backgroundImage: "url('/loginBack.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {isLogin && (
        <div className="h-full">
          <form className="flex flex-col justify-center items-center gap-6 w-1/3 min-w-100 p-4 pt-20 pb-20 rounded-4xl bg-[#eaf3fa] text-[#000105] relative top-[50px] right-[calc(-60%)]">
            <h1 className="text-3xl font-semibold mb-[-20px]">Welcome Back!</h1>
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
            {errors.length > 0 && (
              <div className="w-full flex justify-center mt-[0px]">
                <ul className="text-red-500 text-center p-0 m-0 space-y-0">
                  {errors.map((error, index) => (
                    <li key={index} className="m-0 leading-none">{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      )}
      {!isLogin && (
        <div className="h-full">
          <form className="flex flex-col justify-center items-center gap-6 w-1/3 min-w-100 p-4 pt-15 pb-15 rounded-4xl bg-[#eaf3fa] text-[#000105] relative top-[50px] right-[calc(-60%)]">
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
            {errors.length > 0 && (
              <div className="w-full flex justify-center mt-[4px]">
                <ul className="text-red-500 text-center p-0 m-0 space-y-0">
                  {errors.map((error, index) => (
                    <li key={index} className="m-0 leading-none">{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      )}

    </main>
  );
}
