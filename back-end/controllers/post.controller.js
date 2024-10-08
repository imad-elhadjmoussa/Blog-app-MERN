require('express-async-errors');
const Post = require('./../modules/post.shema');
const compressFile = require('./../middlewares/compressFile');
const CustomError = require('./../utils/CustomError');
const fs = require('fs');
const path = require('path');


const createPost = async (req, res) => {
    const { title, summary, content, photo } = req.body;

    const { id } = req.user;
    const emptyFields = Object.keys(req.body).filter(key => req.body[key] === '');
    if (emptyFields.length > 0) {
        throw new CustomError(`Please fill in the following fields: ${emptyFields.join(', ')}`, 400);
    }
    const post = await Post.create({
        title,
        summary,
        content,
        photo,
        author: id
    });
    res.json({ success: "success", message: "Post created successfully", data: { post } });
}

const getPosts = async (req, res) => {
    const { skip, limit, page, hasMore } = req.pagination;
    const { author } = req.query;
    if (author) {
        const total = await Post.find({ author }).countDocuments();
        const hasMore = total > page * limit;
        const posts = await Post.find({ author }).skip(skip).populate("author").sort({ date: -1 }).limit(parseInt(limit));
        return res.json({ success: "success", message: "Posts fetched successfully", data: { posts: posts, hasMore } });
    }
    const posts = await Post.find().skip(skip).populate("author").sort({ date: -1 }).limit(limit);
    res.json({ success: "success", message: "Posts fetched successfully", data: { posts: posts, hasMore } });
}

const getPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author");
    if (!post) {
        throw new CustomError("Post not found", 404);
    }
    res.json({ success: "success", message: "Post fetched successfully", data: { post } });
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, summary, content, photo } = req.body;
    console.log(photo);
    const emptyFields = Object.keys(req.body).filter(key => req.body[key] === '');
    if (emptyFields.length > 0) {
        throw new CustomError(`Please fill in the following fields: ${emptyFields.join(', ')}`, 400);
    }
    const post = await Post.findByIdAndUpdate(id, {
        title,
        summary,
        content,
        photo
    }, { new: true });
    res.json({ success: "success", message: "Post updated successfully", data: { post } });
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ success: "success", message: "Post deleted successfully" });
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}