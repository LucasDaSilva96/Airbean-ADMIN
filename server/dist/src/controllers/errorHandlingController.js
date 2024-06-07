export const errorHandler = (err, _req, res, _next) => {
    res.status(400).json({
        status: 'fail',
        message: err.message,
    });
};
//# sourceMappingURL=errorHandlingController.js.map