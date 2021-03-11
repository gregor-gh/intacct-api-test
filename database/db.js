require('dotenv').config();
const { MongoClient } = require('mongodb');

const connect = async () => {
  // connect to db
  const URI = process.env.MONGO_URI;
  const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db("IntacctApiTest");

  return db
}

const createUser = async (user) => {
  try {
    // connect
    const db = await connect();

    // set table
    const collection = db.collection("users");

    // now check if user already exists
    const checkUser = await collection.findOne({ username: user.username });
    
    // if we get a result then the user already exists
    if (checkUser) return { "Error": "User already exists" };

    // attempt to insert
    const result = await collection.insertOne(user);
    
    // return result
    return result.ops[0];

  } catch (error) {
    console.log(error);
  }
}

const loginUser = async (user) => {

  // connect
  const db = await connect();

  // set table
  const collection = db.collection("users");

  // now check if user exists
  const checkUser = await collection.findOne({ username: user });

  return checkUser;
}

const createSession = async (session) => {
  try {
    // connect
    const db = await connect();

    // set table
    const collection = db.collection("sessions");

    // add session to database
    const result = await collection.insertOne(session);

    return result.ops[0];

  } catch (error) {
    console.log(error)
  }
}

module.exports = { createUser,loginUser, createSession }