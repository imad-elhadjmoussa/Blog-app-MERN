export const getPosts = async (author_id, limit) => {
    try {
        const res = await fetch(`http://localhost:4000/posts?author=${author_id}&limit=${limit}`);
        const data = await res.json();
        return data.data.posts;
    } catch (error) {
        console.log(error.message);
    }
}


export const getPost = async (id) => {
    try {
        const res = await fetch(`http://localhost:4000/posts/${id}`);
        const data = await res.json();
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
        return data.data.post;
    } catch (error) {
        console.log(error.message);
    }
}
