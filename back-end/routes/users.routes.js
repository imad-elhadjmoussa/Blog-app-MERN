const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('./../controllers/user.controller');
const verifyToken = require('./../middlewares/virfayToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')[1];
        const fileName = file.originalname.split('.')[0] + Date.now() + "." + ext;
        req.body.avatar = fileName;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })

router.post('/register', upload.single("avatar"), userController.register);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.profile);
router.post('/logout', userController.logout);
router.get('/:id', userController.getUser);

module.exports = router;