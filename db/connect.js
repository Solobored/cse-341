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

  let uri = process.env.MONGODB_URI

  if (!uri) {
    console.error("MONGODB_URI is undefined. Check your .env file.")
    return callback(new Error("MONGODB_URI is undefined"), null)
  }

  if (!uri.includes("mongodb+srv://")) {
    console.error("Invalid MongoDB URI format")
    return callback(new Error("Invalid MongoDB URI format"), null)
  }

  if (uri.endsWith("/")) {
    uri += "mongowithnode"
  } else if (!uri.split("/")[3]) {
    uri += "/mongowithnode"
  }

  console.log("Attempting to connect to MongoDB...")
  console.log("Using database:", uri.split("/").pop().split("?")[0])

  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db()
      console.log("Successfully connected to MongoDB.")
      console.log("Connected to database:", _db.databaseName)
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
