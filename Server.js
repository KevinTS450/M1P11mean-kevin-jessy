const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database.js");
const apiRouter = require("./api/api.js");

function setupServer() {
  const app = express();

  const corsOptions = {
    origin: "*", // Allowing all origins, you might want to restrict this to specific domains
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  // Middleware for logging requests
  app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  // Use the API router
  app.use("/api", apiRouter);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error("An error occurred:", err);

    // Log the full error stack trace
    console.error(err.stack);

    // Respond with a more detailed error message
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message, // Include the error message
      stack: err.stack, // Include the stack trace
    });
  });

  return new Promise((resolve, reject) => {
    database
      .connect()
      .then(() => {
        const PORT = 5000;
        const server = app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
          resolve(server);
        });
      })
      .catch((error) => {
        console.error("Failed to start the server:", error);
        reject(error);
      });
  });
}

module.exports = setupServer;
