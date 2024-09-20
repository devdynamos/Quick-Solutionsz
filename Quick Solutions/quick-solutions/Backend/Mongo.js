const { MongoClient } = require('mongodb');

// Local MongoDB connection string
const uri = "mongodb://localhost:27017/qwikSolutions";

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const database = client.db('qwikSolutions');
    const loginCollection = database.collection('Login');
    const OrderCollection = database.collection('Order');
    const HomeCollection = database.collection('Home');
    const ReviewCollection = database.collection('Reviews');
    const BlogCollection = database.collection('Blogs');
    

    return { client, loginCollection, OrderCollection, HomeCollection, ReviewCollection, BlogCollection };
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

module.exports = connectToDatabase;
