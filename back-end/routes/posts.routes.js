const express = require('express');
const router = express.Router();
const verifyToken = require('./../middlewares/virfayToken');

const postsController = require('../controllers/post.controller');

const paginatedModel= require('../middlewares/paginationMiddleware');

const Post = require('./../modules/post.shema');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = file.originalname.split('.')[0] + Date.now() + "." + ext;
        req.body.photo = fileName;
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })



router.post('/',verifyToken,upload.single("photo"), postsController.createPost);
router.get('/', paginatedModel(Post), postsController.getPosts);
router.get('/:id', postsController.getPost);
router.patch('/:id',verifyToken,upload.single("photo"), postsController.updatePost);
router.delete('/:id',verifyToken, postsController.deletePost);

module.exports = router;