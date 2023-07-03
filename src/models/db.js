const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.DB_HOST);
  await client.connect();

  singleton = client.db(process.env.DB_DATABASE);
  return singleton;
}

async function findAll(collection) {
  const db = await connect();
  return await db.collection(collection).find().toArray();
}

const insertOne = async (collection, object) => {
  const db = await connect();
  return db.collection(collection).insertOne(object);
};

const findOne = async (collection, id) => {
  const db = await connect();
  let obj = await db
    .collection(collection)
    .find({ _id: new ObjectId(id._id) })
    .toArray();
  if (obj) {
    return obj[0];
  }
  return false;
};

const findOneByNick = async (collection, nick) => {
  const db = await connect();
  let obj = await db.collection(collection).findOne({ nick: nick.nick });
  if (obj) {
    return obj;
  }
  return false;
};

const updateOne = async (collection, object, param) => {
  const db = await connect();
  let result = await db
    .collection(collection)
    .updateOne(param, { $set: object });
  return result;
};

module.exports = { findAll, insertOne, findOne, updateOne, findOneByNick };
