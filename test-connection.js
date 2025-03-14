require("dotenv").config()
const { MongoClient } = require("mongodb")

async function testConnection() {
  console.log("MONGODB_URI:", process.env.MONGODB_URI)

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is undefined. Check your .env file.")
    return
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    console.log("Attempting to connect to MongoDB...")
    await client.connect()
    console.log("Successfully connected to MongoDB!")
    await client.close()
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
  }
}

testConnection()

