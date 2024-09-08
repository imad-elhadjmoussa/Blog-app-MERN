import { url } from "../utils/url";

export const login = async (user) => {

    const res = await fetch(`${url}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data.user;

}

export const register = async (user) => {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('avatar', user.avatar);
    const res = await fetch(`${url}/api/users/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data.user;
}

export const getUser = async (id) => {
    const res = await fetch(`${url}/api/users/${id}`, {
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data.user;
}
