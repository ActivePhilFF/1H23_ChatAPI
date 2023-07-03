const db = require("../models/db");

const registerUser = async (nick, color) => {
  return await db.insertOne("users", { nick, color });
};

const findUser = async (idUser) => {
  let user = await db.findOne("users", { _id: idUser });
  return user;
};

const findUserByNick = async (nick) => {
  let user = await db.findOneByNick("users", { nick });
  return user;
};

const updateUser = async (user) => {
  return await db.updateOne("users", user, { _id: user._id });
};

module.exports = {
  registerUser,
  findUser,
  updateUser,
  findUserByNick,
};
