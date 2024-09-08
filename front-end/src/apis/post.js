import { url } from "../utils/url";

export const getPosts = async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${url}/api/posts?${query}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data;
}


export const getPost = async (id) => {
    const res = await fetch(`${url}/api/posts/${id}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data.post;
}

export const createPost = async (post) => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('summary', post.summary);
    formData.append('photo', post.photo);
    formData.append('content', post.content);
    const res = await fetch(`${url}/api/posts`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data.post;
}

export const deletePost = async (id) => {
    const res = await fetch(`${url}/api/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(data.message);
    }
    return res.ok;
}

export const editPost = async (id, post) => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('summary', post.summary);
    formData.append('photo', post.photo);
    formData.append('content', post.content);
    const res = await fetch(`${url}/api/posts/${id}`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data.data.post;
}
