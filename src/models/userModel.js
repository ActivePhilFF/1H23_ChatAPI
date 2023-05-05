const db = require("../models/db");
async function registerUser(nick) {
  return await db.insertOne("users", { nick });
}

module.exports = {
  registerUser,
};
