var express = require('express');
var router = express.Router();
const WM = require("../src/clientGame/world/worldManager");

const worldManager = new WM.WorldManager('1c8f041feaddf0d8f380d8392583e29c');

router.use("/websocket", function (req, res, next) {
    worldManager.networkManager.websocketHandler(req, res);
});

module.exports = router;