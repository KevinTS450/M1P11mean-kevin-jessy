require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db();
    console.log("Using database : ", database.databaseName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = {
  connect,
  client,
};
