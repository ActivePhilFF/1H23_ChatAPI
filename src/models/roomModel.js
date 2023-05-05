const db = require("../models/db");
async function listRooms() {
  return await db.findAll("rooms");
}

module.exports = {
  listRooms,
};
