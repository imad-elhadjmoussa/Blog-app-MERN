const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
