const bcrypt = require("bcrypt");
const NodeCache = require("node-cache");
const tokenCache = new NodeCache();

async function CryptPass(pass) {
  const hash = await bcrypt.hash(pass, 10);
  return hash;
}
async function calculateAge(dateOfBirth) {
  console.log("Input Date of Birth:", dateOfBirth);

  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  console.log("Final Age:", age);

  return age;
}

async function generateRandomNumber() {
  return Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
}

function addToBlacklist(token) {
  tokenCache.set(token, true);
}

function isTokenBlacklisted(token) {
  return tokenCache.has(token);
}

module.exports = {
  CryptPass,
  calculateAge,
  generateRandomNumber,
  isTokenBlacklisted,
  addToBlacklist,
};
