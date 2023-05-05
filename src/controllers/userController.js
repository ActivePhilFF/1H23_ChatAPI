const token = require("../utils/token");
const userModel = require("../models/userModel");

const enter = async (nick) => {
  let resp = await userModel.registerUser(nick);
  if (resp.insertedId) {
    return {
      idUser: resp.insertedId,
      token: await token.setToken(
        JSON.stringify(resp.insertedId).replace(/"/g, ""),
        nick
      ),
      nick: nick,
    };
  }
};

module.exports = { enter };
