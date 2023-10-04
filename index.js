const app = require('./app');
const PORT = process.env.PORT || 5000;

const cLogger = require('./helpers/logger/winstonLogger');

//Start server and console log the used port
const server = app.listen(PORT, function () {
    cLogger.info(
    `Server is up and running on  http://localhost:${server.address().port}`
  );
});

const exitHandler = () => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
};

process.on('unhandledRejection', (err, p)=>{
    cLogger.error(`Error: ${err.message}`);
    cLogger.error("Possibly Unhandled Rejection at: Promise ", p);
    cLogger.info('Shutting down the server due to unhandled rejection error');
    exitHandler();
})

process.on('uncaughtException', (err) => {
    cLogger.error(`Error: ${err.message}`);
    cLogger.info('Shutting down the server due to uncaught exception error');
    exitHandler();
})

process.on('SIGTERM', () => {
    cLogger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});


