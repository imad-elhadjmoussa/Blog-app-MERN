const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname, "..", 'uploads', 'posts');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = file.originalname.split('.')[0] + Date.now() + "." + ext;
        req.body.photo = fileName;
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;