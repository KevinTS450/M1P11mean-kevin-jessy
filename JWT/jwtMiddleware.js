const jwt = require("jsonwebtoken");
const secretKey = "defaultSecret";
const database = require("../database.js");
const socketIo = require("../../socketio");

const User = require("../model/Users/user");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    if (!token) {
      throw new Error("Token not provided");
    }

    const decoded = jwt.verify(token, secretKey);

    const collection = database.client.db("MEAN").collection("users");

    const user = await collection.findOne({ email: decoded.email });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    const socket = socketIo.getIO();
    const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
    if (decoded.exp < currentTime) {
      socket.emit("tokenExpired", {
        event: "tokenExpired",
        message: "tokenExpired",
      });
      throw new Error("Token expired");
    }

    console.log("Decoded token:", decoded);
    console.log("Decoded User ID in Middleware:", req.user._id);

    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};

module.exports = authenticateToken;
