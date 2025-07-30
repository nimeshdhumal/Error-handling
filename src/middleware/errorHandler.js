const errorHandler = (err, req, res, next) => {

    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong';
    const error = err.errors;

    res.status(statusCode).json({
        success: false,
        message: message,
        errors: error
    });
};

module.exports = errorHandler;