const token = require("../utils/token");
const userModel = require("../models/userModel");
const userColors = [
  "#F44336",
  "#E91E63",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#9E9E9E",
  "#000000",
  "#FFFFFF",
  "#FF4081",
  "#E040FB",
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
];

const enter = async (nick) => {
  let user = await userModel.findUserByNick(nick);
  if (user) {
    console.log({ enter: user });
    return {
      idUser: user._id,
      fullToken: await token.setFullUserToken(user),
      nick: nick,
    };
  }
  let color = userColors[Math.floor(Math.random() * userColors.length)];
  insertedUser = await userModel.registerUser(nick, color);
  if (insertedUser.insertedId) {
    user = await userModel.findUser(insertedUser.insertedId);
    return {
      idUser: user.insertedId,
      fullToken: await token.setFullUserToken(user),
      nick: nick,
    };
  }
};

module.exports = { enter };
