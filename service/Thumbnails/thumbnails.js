const fs = require("fs");
const path = require("path");

const getUploadsPath = () => {
  return path.join(__dirname, "..", "..", "uploads");
};

module.exports = {
  getUploadsPath,
};
