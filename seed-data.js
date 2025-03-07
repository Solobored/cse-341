const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

async function seedDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB.');
    const database = client.db('test');
    const contactsCollection = database.collection('contacts');

    await contactsCollection.deleteMany({});
    console.log('Cleared existing contacts');

    const contacts = [
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
    ];

    const result = await contactsCollection.insertMany(contacts);
    console.log(`${result.insertedCount} documents were inserted.`);
  } finally {
    await client.close();
  }
}

seedDB().catch(console.error);