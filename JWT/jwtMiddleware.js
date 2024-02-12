const jwt = require("jsonwebtoken");
const secretKey = "defaultSecret";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded.id);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    console.log("Decoded User ID in Controller:", req.user.id);

    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};

module.exports = authenticateToken;
