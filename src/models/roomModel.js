const db = require("../models/db");
const listRooms = async () => {
  return await db.findAll("rooms");
}

const findRoom = async (idRoom) => {
  return db.findOne("rooms", { _id: idRoom });
}

module.exports = {
  listRooms,
  findRoom,
};
