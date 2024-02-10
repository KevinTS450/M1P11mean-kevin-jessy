const jwt = require("jsonwebtoken");
const secretKey = "defaultSecret"; // Replace with your actual secret key

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);

    // Access user properties directly from the decoded payload
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    console.log(req.user);

    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};
module.exports = authenticateToken;
