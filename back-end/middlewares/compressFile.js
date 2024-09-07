const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const compressFile = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const outputPath = path.join(__dirname, "..", 'uploads', 'posts', `compressed-${req.file.filename}`);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    await sharp(req.file.path)
        .resize(20)
        .jpeg({ quality: 100 })
        .toFile(outputPath);

    next();
}


module.exports = compressFile;