const express = require("express");
const { checkToken } = require("./middlewares/checker");
const app = express();
const cookieParser = require("cookie-parser");
const roomController = require("./controllers/roomController");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  router.get("/rooms", checkToken, async (req, res, next) => {
    
    let resp = await roomController.get();
    res.status(200).send(resp);
  })
);

// The route bellow could be put instead of post
app.use(
  "room/enter",
  router.post("/room/enter", checkToken, async (req, res) => {
    let id = req.headers.id;
    let room = req.query.roomId;
    let resp = await roomController.enter(id, room);
    res.status(200).send(resp)
  })
);

app.use(
  "/enter",
  router.post("/enter", async (req, res, next) => {
    const userController = require("./controllers/userController");
    let resp = await userController.enter(req.body.nick);
    res.cookie("token", resp.token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).send(resp);
  })
);

module.exports = app;
