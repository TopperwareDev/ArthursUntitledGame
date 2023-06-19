var express = require('express');
var router = express.Router();
const WM = require("../src/clientGame/storage/worldsManager");

const worldManager = new WM.WorldManager('7271b62e5135bc0920fdbc34cf2816e8');

router.use("/websocket", function (req, res, next) {
    worldManager.networkManager.websocketHandler(req, res);
});

module.exports = router;