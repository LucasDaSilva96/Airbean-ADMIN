// Error handling middleware
export const errorHandler = (err, _req, res, _next) => {
    console.log(err);
    res.status(400).json({
        status: 'fail', // Indicate failure status
        message: err.message, // Send error message in response
    });
};
//# sourceMappingURL=errorHandlingController.js.map