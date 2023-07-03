const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const checkFullUserToken = async (token) => {
  if (token) {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        console.log("Could not verify token!");
        return false;
      }
      return decoded.user;
    });
  }
  return false;
};
const setFullUserToken = async (user) => {
  if (user) {
    let token = jwt.sign({ user }, secret, { expiresIn: 28800 });
    return token;
  }
};

module.exports = {
  setFullUserToken,
  checkFullUserToken,
};
