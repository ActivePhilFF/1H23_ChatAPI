const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");

const get = async (req, res) => {
  return await roomModel.listRooms();
};

const enter = async (userId, roomId) => {
  const room = await roomModel.findRoom(roomId);
  let user = await userModel.findUser(userId);
  user.room = { _id: room._id, name: room.name, type: room.type };
  if (await userModel.updateUser(user)) {
    return { msg: "Ok", timestamp: (timestamp = Date.now()) };
  }
  return false;
};

module.exports = { get, enter };
