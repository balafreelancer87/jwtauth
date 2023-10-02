const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error("err.errors", err.errors);
    console.error("err.name", err.name);
    console.error("err.statusCode", err.statusCode);
    console.error("err.message", err.message);
    console.error("err.value", err.value);

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    let errorResponse = {
        success: false,
        message: err.message || 'Something went wrong',
        data: err.errors || null
    };

    // if (res.headerSent) {
    //     //res already sent ? => don't send res, just forward the error
    //     return next(err);
    // }

  return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandlerMiddleware;