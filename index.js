require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const morgan = require("morgan");

//db connection
const connectDatabase = require("./db/connect");
connectDatabase();

//all routes
const routes = require('./routes/v1');


// middlewares

//logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
console.log(`You are in the ${process.env.NODE_ENV} enviroment!`);

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON data
app.use(express.json());
// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

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

module.exports = app;

//Start server and console log the used port
const server = app.listen(PORT, function () {
  console.log(
    `Server is up and running on  http://localhost:${server.address().port}`
  );
});

process.on('unhandledRejection', (err, p)=>{
    console.log(`Error: ${err.message}`);
    console.log("Possibly Unhandled Rejection at: Promise ", p);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    });
})

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    });
})

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});


