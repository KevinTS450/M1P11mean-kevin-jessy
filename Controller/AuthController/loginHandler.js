const jwt = require("jsonwebtoken");
const loginService = require("../../service/Auth/Auth");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await loginService.handleAuthentication(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const expiresIn = 30 * 60;
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      "defaultSecret",
      { expiresIn }
    );
    res.json({ accessToken, expiresIn });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function Logout(req, res) {
  try {
    const token = req.header("Authorization");
    await loginService.logout(token);
    return res.status(200).json({ message: "user disconnected" });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loginUser, Logout };
