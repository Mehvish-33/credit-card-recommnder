const errorHandler = (err, req, res, next) => {
<<<<<<< HEAD
    // Log the error for debugging purposes (in production, use a dedicated logger like Winston)
    console.error(err.stack);

    // Determine the status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Send a JSON error response
    res.status(statusCode).json({
        message: err.message,
        // In development, send stack trace for debugging; in production, omit for security
=======
    
    console.error(err.stack);

    
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

   
    res.status(statusCode).json({
        message: err.message,
        
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;