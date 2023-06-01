const express = require("express");
const router = express.Router();
const WSU = require("../../src/clientGame/communication/websocketUpgrade");

let connections = 0;

router.use("/", function (req, res, next) {
  WSU.upgrade(req)
    .then((ws) => {
      //on connection
      ++connections;

      ws.on("message", function incoming(message) {
        console.log("Received message:", message);
        ws.send(message);
      });

      ws.on("close", function close() {
        --connections;
      });
    })
    .catch(() => {
      next();
    });
});

module.exports = router;
