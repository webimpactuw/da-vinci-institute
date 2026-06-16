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
        
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            setErrors([data.detail || "Something went wrong"]);
            return;
        } else {
            localStorage.setItem("token", data.access_token);
            router.push("/courses");
        }
        setErrors([]);
        setUsername("");
        setPassword("");
        setPasswordVerify("");
    } catch (err) {
        console.error("Signup fetch error:", err);
        setErrors(["Servers Unreachable. Try again later."])
    }
};