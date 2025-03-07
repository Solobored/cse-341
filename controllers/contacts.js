const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId

const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDb()
    console.log("Database connection:", db ? "Successful" : "Failed")

    const collection = db.collection("contacts")
    console.log("Collection name:", collection.collectionName)

    const result = await collection.find().toArray()
    console.log("Number of contacts found:", result.length)

    res.status(200).json(result)
  } catch (error) {
    console.error("Error in getAllContacts:", error)
    res.status(500).json({ message: error.message })
  }
}

const getSingleContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    console.log("Looking for contact with ID:", userId)

    const db = mongodb.getDb()
    const result = await db.collection("contacts").find({ _id: userId }).toArray()

    console.log("Contact found:", result.length > 0 ? "Yes" : "No")

    if (result.length === 0) {
      return res.status(404).json({ message: "Contact not found" })
    }

    res.status(200).json(result[0])
  } catch (error) {
    console.error("Error in getSingleContact:", error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllContacts,
  getSingleContact,
}

