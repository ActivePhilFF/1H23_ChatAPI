const db = require("../models/db");
const listRooms = async () => {
  return await db.findAll("rooms");
}

const findRoom = async (idRoom) => {
  return db.findOne("rooms", { _id: idRoom });
}

const updateMessages = async (room) => {
  return await db.updateOne("rooms", room, { _id: room._id });
}

module.exports = {
  listRooms,
  findRoom,
  updateMessages,
};
