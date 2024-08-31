const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ message: err.message });
}

module.exports = errorHandler;