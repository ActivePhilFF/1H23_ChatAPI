exports.get = async (req, res) => {
  let roomsModel = require("../models/roomModel")
  return await roomsModel.listRooms();
};
