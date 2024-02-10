const setupServer = require("./Server"); // Correct the filename to "server.js"

setupServer()
  .then((server) => {
    console.log("Server setup completed.");
  })
  .catch((error) => {
    console.error("Failed to set up the server:", error);
  });
