const checkToken = async (req, res, next) => {
  if (!req.cookies.token) {
    res
      .status(403)
      .send({ result: "Access denied!", reason: "Missing token!" });
    return;
  }
  if (!req.headers.nick) {
    res.status(403).send({ result: "Access denied!", reason: "Missing nick!" });
    return;
  }
  if (!req.headers.id) {
    res.status(403).send({ result: "Access denied!", reason: "Missing id!" });
    return;
  }
  const token = require("../utils/token");
  let validToken = await token.checkToken(
    req.cookies.token,
    req.headers.nick,
    req.headers.id
  );
  if (!validToken) {
    res.status(403).send({ result: "Access denied!" });
    return;
  }
  next();
};

module.exports = { checkToken };
