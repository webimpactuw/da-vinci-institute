const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUpUser = async (username, password) => {
    const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        // Throw an error so the component's catch block can grab it
        throw new Error(data.detail || "Something went wrong during sign up");
    }

    return data;
};

export const logInUser = async (username, password) => {
    const res = await fetch(`${API_URL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.detail || "Something went wrong during login");
    }

    return data;
};