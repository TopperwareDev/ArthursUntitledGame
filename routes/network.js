var express = require('express');
var router = express.Router();
const WM = require("../src/clientGame/world/worldManager");

const worldManager = new WM.WorldManager('World_1')

router.use("/webStream", function (req, res, next) {
    worldManager.networkManager.handleRequest_webstream(req, res);
});

router.post("/connect", function (req, res, next) {
    worldManager.networkManager.handleRequest_connect(req, res);
});





















// const webSocketUpgrade = require("../src/clientGame/networking/src/websocketUpgrade");

// router.use("/", function (req, res, next) {
//   webSocketUpgrade.upgrade(req)
//     .then((ws) => {
//       // on connect

//       ws.on("message", function incoming(message) {
//         console.log("Received message:", message);
//         ws.send(message);
//       });

//       ws.on("close", function close() {
//         --connections;
//       });
//     })
//     .catch(() => {
//       next();
//     });
// });

module.exports = router;