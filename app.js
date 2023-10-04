require("dotenv").config();
const config = require('./config/config');
// express
const express = require("express");
const app = express();

//security and logger
const cors = require("cors");
// const morgan = require("morgan");
const loggerMiddleware = require('./helpers/logger');
const { rateLimiter } = require('./middlewares/rateLimiter');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');


// middlewares
const errorHandlerMiddleware = require('./middlewares/errorHandler');

//db connection
const connectDatabase = require("./db/connect");
connectDatabase();

//all routes
const routes = require('./routes/v1');


//logger
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
console.log(`You are in the ${config.env} enviroment!`);
if (config.env !== 'test') {
    app.use(loggerMiddleware.successHandler);
    app.use(loggerMiddleware.errorHandler);
  }

// middlewares

// Restrict all routes to only 100 requests per IP address every 10 minutes
app.set('trust proxy', 1);
app.use(rateLimiter);

// Using helmet middleware
app.use(helmet());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Protect against HPP, should come before any routes
app.use(hpp());

// Parse incoming JSON data
app.use(express.json());
// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query
app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(`This request[${key}] is sanitized`, req);
      },
    }),
  );



// Logging middleware
app.use((req, res, next) => {
    // Log details of incoming requests
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});


// index page
app.get("/", async (req, res) => {
    res.status(200).json("Welcome to API")
});


// v1 api routes
app.use('/api/v1', routes);

//catch 404 and user enters invalid url
app.use((req, res, next) => {
    res.status(404).json({
        error:'Url not found'
    })
})

// global error handler
app.use(errorHandlerMiddleware);

// app.use((error, req, res, next) => {
//     if (res.headerSent) {
//         //res already sent ? => don't send res, just forward the error
//         return next(error);
//     }
//     //else, send a res
//     res.status(error.code || 500);
//     res.json({
//         message: error.message || 'An unknown error occurred',
//     });
// });

module.exports = app;