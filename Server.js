const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database.js");
const apiRouter = require("./api/api.js");
const path = require("path");

function setupServer() {
  const app = express();

  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(
    "uploads",
    express.static(path.join(__dirname, "..", "..", "uploads"))
  );

  app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  app.use("/api", apiRouter);

  app.use((err, req, res, next) => {
    console.error("An error occurred:", err);

    console.error(err.stack);

    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      stack: err.stack,
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
