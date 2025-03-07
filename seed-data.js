require("dotenv").config()
const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const contacts = [
  {
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@email.com",
    favoriteColor: "purple",
    birthday: "1988-12-10",
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@email.com",
    favoriteColor: "orange",
    birthday: "2000-05-20",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    favoriteColor: "yellow",
    birthday: "1991-09-15",
  },
  {
    firstName: "Robert",
    lastName: "Miller",
    email: "robert.miller@email.com",
    favoriteColor: "black",
    birthday: "1987-04-30",
  },
]

async function seedDatabase() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const database = client.db()
    const collection = database.collection("contacts")

    const result = await collection.insertMany(contacts)
    console.log(`${result.insertedCount} contacts inserted`)

    console.log("Contact IDs:")
    Object.values(result.insertedIds).forEach((id) => {
      console.log(id.toString())
    })
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

seedDatabase()

