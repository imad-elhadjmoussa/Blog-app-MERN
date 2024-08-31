require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || '';
    // Check if no token
    if (!token) {
        throw new CustomError('No token, authorization denied', 401);
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
};

module.exports = verifyToken;
