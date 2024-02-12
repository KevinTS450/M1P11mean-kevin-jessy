const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("MEAN");
    console.log("Using database : ", database.namespace);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = {
  connect,
  client,
};
