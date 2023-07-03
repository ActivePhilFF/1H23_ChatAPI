const token = require("../utils/token");

const checkFullToken = async (req, res, next) => {
  if (!req.cookies.fullToken) {
    res
      .status(403)
      .send({ result: "Access denied!", reason: "Missing token!" });
    return;
  }
  let validToken = await token.checkFullUserToken(req.cookies.fullToken);
  if (!validToken) {
    console.log("invalid token");
    return res.status(403).send({ result: "Access denied!" });
  }
  req.headers.nick = validToken.nick;
  req.headers.id = validToken._id;
  req.headers.color = validToken.color;
  next();
};

module.exports = { checkFullToken };
