const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");

const get = async () => {
  return await roomModel.listRooms();
};

const enter = async (userId, roomId) => {
  try {
    const room = await roomModel.findRoom(roomId);
    if (!room) {
      throw new Error("Room not found");
    }

    let user = await userModel.findUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.room = { _id: room._id, name: room.name, type: room.type };

    const updatedUser = await userModel.updateUser(user);
    if (updatedUser) {
      return {
        msg: "Ok",
        timestamp: Date.now(),
        color: user.color,
        user: user.nick,
      };
    } else {
      throw new Error("Failed to update user");
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};


const sendMessage = async (nick, msg, roomId, color) => {
  let room = await roomModel.findRoom(roomId);
  try {
    if (!room.msgs) {
      room.msgs = [];
    }
    let timestamp = Date.now();
    room.msgs.push({ nick, color, msg, timestamp });
    let resp = await roomModel.updateMessages(room);
    return { msg: "OK", timestamp: timestamp, color: color, user: nick };
  } catch (error) {
    return { msg: "Error" };
  }
};

const getMessages = async (roomId, timestamp) => {
  let room = await roomModel.findRoom(roomId);
  if (!room.msgs) {
    room.msgs = [];
  }
  let mensagens = room.msgs.filter((msg) => msg.timestamp > timestamp);
  let msgs = [];
  mensagens.forEach((msg) => {
    let mens = {
      message: msg.msg,
      time: msg.timestamp,
      userName: msg.nick,
      userColor: msg.color,
    };
    msgs.push(mens);
  });
  return { msgs, timestamp: Date.now() };
};

module.exports = { get, enter, sendMessage, getMessages };
