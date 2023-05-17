const db = require("../models/db");

const registerUser = async (nick) => {
  return await db.insertOne("users", { nick });
};

const findUser = async (idUser) => {
  let user = await db.findOne("users", { _id: idUser });
  return user;
};

const updateUser = async (user) => {
  return await db.updateOne("users", user, { _id: user._id });
};

module.exports = {
  registerUser,
  findUser,
  updateUser,
};
