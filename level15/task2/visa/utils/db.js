const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('digitaljournal');
  console.log('Connected to MongoDB');
  return db;
}

function getCollection() {
  if (!db) throw new Error('Database not connected yet');
  return db.collection('journalDB');
}

module.exports = connectDB;
module.exports.getCollection = getCollection;
