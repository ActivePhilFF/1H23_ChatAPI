const express = require("express");
const { checkFullToken } = require("./middlewares/checker");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const roomController = require("./controllers/roomController");
const userController = require("./controllers/userController");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4321"],
    credentials: true,
  })
);

const router = express.Router();
app.use(
  "/",
  router.get("/", (req, res, next) => {
    res.status(200).send("<h1>API - CHAT</h1>");
  })
);

app.use(
  "/",
  router.get("/about", (req, res, next) => {
    res.status(200).send({
      name: "API - CHAT",
      version: "0.1.0",
      author: "Filipe Freitas",
    });
  })
);

app.use(
  "/rooms",
  router.get("/rooms", checkFullToken, async (req, res, next) => {
    let resp = await roomController.get();
    res.status(200).send(resp);
  })
);

// The route bellow could be put instead of post? Not sure.
app.use(
  "room/enter",
  router.post("/room/enter", checkFullToken, async (req, res) => {
    let userId = req.headers.id;
    console.log("Entering Room\n", { userId });
    let roomId = req.query.roomId;
    let resp = await roomController.enter(userId, roomId);
    let status = resp ? 200 : 400;
    res.status(status).send(resp);
  })
);

app.use(
  "room/",
  router.post("/room/:id/message", checkFullToken, async (req, res) => {
    let nick = req.headers.nick;
    let color = req.headers.color;
    let msg = req.body.msg;
    let roomId = req.params.id;
    let resp = await roomController.sendMessage(nick, msg, roomId, color);
    res.status(200).send(resp);
  })
);

app.use(
  "room/",
  router.get("/room/:id/message/", checkFullToken, async (req, res) => {
    let messages = await roomController.getMessages(
      req.params.id,
      req.query.timestamp
    );
    res.status(200).send(messages);
  })
);

app.use(
  "/enter",
  router.post("/enter", async (req, res, next) => {
    let resp = await userController.enter(req.body.nick);
    res.cookie("fullToken", resp.fullToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).send(resp);
  })
);

module.exports = app;
