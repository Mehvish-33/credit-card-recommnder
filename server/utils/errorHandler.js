const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes (in production, use a dedicated logger like Winston)
    console.error(err.stack);

    // Determine the status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Send a JSON error response
    res.status(statusCode).json({
        message: err.message,
        // In development, send stack trace for debugging; in production, omit for security
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;