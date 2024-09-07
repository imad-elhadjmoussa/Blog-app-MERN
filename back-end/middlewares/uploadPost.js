const multer = require('multer');
const path = require('path');
const CustomError = require('../utils/CustomError');
const fs = require('fs');

const uploadDir = path.join(__dirname, "..", 'uploads', 'posts');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = file.originalname.split('.')[0] + Date.now() + "." + ext;
        req.body.photo = fileName;
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },

})

module.exports = upload;