const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.CONNECTION_URI;
const databaseName = process.env.DEFAULT_DB;

async function connectToDb() {
  try {
    const client = await MongoClient.connect(uri); // Options removed
    return client.db(databaseName);
  } 
  catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

module.exports = { connectToDb };
