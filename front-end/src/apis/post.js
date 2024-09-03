export const getPosts = async (params) => {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`http://localhost:4000/posts?${query}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        console.log(data);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
}


export const getPost = async (id) => {
    try {
        const res = await fetch(`http://localhost:4000/posts/${id}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data.data.post;
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = async (post) => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('summary', post.summary);
    formData.append('photo', post.photo);
    formData.append('content', post.content);
    try {
        const res = await fetch(`http://localhost:4000/posts`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data.data.post;
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = async (id) => {
    try {
        const res = await fetch(`http://localhost:4000/posts/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) {
            throw new Error('Something went wrong!');
        }
        return res.ok;
    } catch (error) {
        console.log(error.message);
    }
}

export const editPost = async (id, post) => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('summary', post.summary);
    formData.append('photo', post.photo);
    formData.append('content', post.content);
    try {
        const res = await fetch(`http://localhost:4000/posts/${id}`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data.data.post;
    } catch (error) {
        console.log(error.message);
    }
}
