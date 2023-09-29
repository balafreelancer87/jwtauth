require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const logger = require("morgan");

//db connection
const connectDatabase = require("./db/connect");
connectDatabase();

//all routes
const routes = require('./routes/v1');


//logger
app.use(logger("dev"));

//cors
app.use(cors());

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.json());

// parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: true }));


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


