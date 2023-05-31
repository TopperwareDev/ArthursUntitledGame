const express = require("express");
const router = express.Router();
const WSU = require("../../src/clientGame/communication/websocketUpgrade");

let connections = 0;

router.use("/", function (req, res, next) {
  WSU.upgrade(req)
    .then((ws) => {
      //on connection
      console.log('New connection');
      ++connections;
      console.log(connections);

      ws.on("message", function incoming(message) {
        console.log("Received message:", message);

        ws.send(message);
      });

      ws.on("close", function close() {
        console.log("WebSocket connection closed");
        --connections;
        console.log(connections);
      });
    })
    .catch(() => {
      next();
    });
});

module.exports = router;
