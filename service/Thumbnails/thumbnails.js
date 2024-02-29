const fs = require("fs");
const path = require("path");

const getUploadsPath = () => {
  return path.join(__dirname, "");
};

module.exports = {
  getUploadsPath,
};
