const dotenv = require("dotenv")
const result = dotenv.config()
if (result.error) {
  console.log("Error loading .env file:", result.error)
}

const MongoClient = require("mongodb").MongoClient

let _db

const initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized!")
    return callback(null, _db)
  }

  const uri = process.env.MONGODB_URI

  // Add debugging to check if the URI is loaded
  if (!uri) {
    console.error("MONGODB_URI is undefined. Check your .env file.")
    return callback(new Error("MONGODB_URI is undefined"), null)
  }

  console.log("Attempting to connect to MongoDB...")

  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db()
      console.log("Successfully connected to MongoDB.")
      callback(null, _db)
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err)
      callback(err)
    })
}

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized")
  }
  return _db
}

module.exports = {
  initDb,
  getDb,
}

