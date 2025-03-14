const express = require("express")
const router = express.Router()

const contactsController = require("../controllers/contacts")

// GET all contacts
router.get("/", contactsController.getAllContacts)

// GET single contact by ID
router.get("/:id", contactsController.getSingleContact)

// CREATE new contact
router.post("/", contactsController.createContact)

// UPDATE contact
router.put("/:id", contactsController.updateContact)

// DELETE contact
router.delete("/:id", contactsController.deleteContact)

module.exports = router

