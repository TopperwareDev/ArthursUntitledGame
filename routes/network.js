var express = require('express');
var router = express.Router();
const WM = require("../src/clientGame/world/worldManager");

const worldManager = new WM.WorldManager('World_1')

router.use("/websocket", function (req, res, next) {
    worldManager.networkManager.websocket(req, res);
});

module.exports = router;