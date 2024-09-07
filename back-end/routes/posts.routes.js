const express = require('express');
const router = express.Router();
const verifyToken = require('./../middlewares/virfayToken');

const postsController = require('../controllers/post.controller');

const paginatedModel = require('../middlewares/paginationMiddleware');

const Post = require('./../modules/post.shema');

const upload = require('./../middlewares/uploadPost');

const compressFile = require('./../middlewares/compressFile');

router.post('/', verifyToken, upload.single("photo"), compressFile, postsController.createPost);

router.get('/', paginatedModel(Post), postsController.getPosts);

router.get('/:id', postsController.getPost);

router.patch('/:id', verifyToken, upload.single("photo"), compressFile, postsController.updatePost);

router.delete('/:id', verifyToken, postsController.deletePost);

module.exports = router;