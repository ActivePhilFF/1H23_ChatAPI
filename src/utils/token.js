const jwt = require("jsonwebtoken");

const checkToken = async (token, key, id) => {
  return jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return false;
    }
    if (decoded.id == id) {
      return true;
    }
  });
};

const setToken = async (id, key) => {
  console.log(id);
  if (id) {
    return jwt.sign({ id }, key, { expiresIn: 28800 });
  }
  return false;
};

module.exports = {
  checkToken,
  setToken,
};
