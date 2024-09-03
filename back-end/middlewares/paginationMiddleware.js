const paginationMiddleware = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const total = await model.countDocuments();
        const hasMore = total > page * limit;
        req.pagination = { skip, limit, page, hasMore };

        next();
    }
};

module.exports = paginationMiddleware;
