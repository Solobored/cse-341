const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("contacts").find().toArray()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().collection("contacts").find({ _id: userId }).toArray()

    if (result.length === 0) {
      return res.status(404).json({ message: "Contact not found" })
    }

    res.status(200).json(result[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// CREATE new contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    }

   
    const requiredFields = ["firstName", "lastName", "email", "favoriteColor", "birthday"]
    for (const field of requiredFields) {
      if (!contact[field]) {
        return res.status(400).json({ message: `${field} is required` })
      }
    }

    const response = await mongodb.getDb().collection("contacts").insertOne(contact)

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId })
    } else {
      res.status(500).json({ message: "Error creating contact" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE contact
const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)

    
    const contact = {}
    if (req.body.firstName) contact.firstName = req.body.firstName
    if (req.body.lastName) contact.lastName = req.body.lastName
    if (req.body.email) contact.email = req.body.email
    if (req.body.favoriteColor) contact.favoriteColor = req.body.favoriteColor
    if (req.body.birthday) contact.birthday = req.body.birthday

    const response = await mongodb.getDb().collection("contacts").updateOne({ _id: userId }, { $set: contact })

    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: "Contact not found or no changes made" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDb().collection("contacts").deleteOne({ _id: userId })

    if (response.deletedCount > 0) {
      res.status(200).send()
    } else {
      res.status(404).json({ message: "Contact not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
}

