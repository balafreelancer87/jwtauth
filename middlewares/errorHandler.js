const { StatusCodes } = require('http-status-codes');
const config = require('../config/config');
const wLogger = require('../helpers/logger/winstonLogger');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("Error Handling Middleware called")
  // console.log('Path: ', req.path)

  // console.error("err.errors", err.errors);
  // console.error("err.statusCode", err.statusCode);
  // console.error("err.message", err.message);

  // console.error("err.stack", err.stack);

  // console.error("err.value", err.value);
  // console.error("err.name", err.name);
  // console.error("err.code", err.code);
  // console.error("err.keyValue", err.keyValue);

  let customError = {
    // set default
    success: false,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Sever Error or Something went wrong',
    data: err.errors || null
  }

  //for morgan message
  res.locals.errorMessage = err.message;

  if (config.env === 'development') {
    wLogger.error(err);
  }

  // if (res.headerSent) {
  //     //res already sent ? => don't send res, just forward the error
  //     return next(err);
  // }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  // let errorResponse = {
  //   success: false,
  //   message: err.message || 'Something went wrong',
  //   data: err.errors || null
  // };

  console.log(customError);
  return res.status(customError.statusCode).json(customError);
};

module.exports = errorHandlerMiddleware;
