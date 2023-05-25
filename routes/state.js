const express = require("express");
const router = express.Router();
const WSU = require("../src/websocketUpgrade");

router.use("/", function (req, res, next) {
    WSU.upgrade(req).then((ws) => {
      // WebSocket connection established
      console.log("Player connected streaming position");

      ws.on("message", function incoming(message) {
        console.log("Received message:", message);
        // Handle incoming WebSocket messages here
        ws.send(message);
      });

      ws.on("close", function close() {
        console.log("WebSocket connection closed");
        // Handle WebSocket connection closure here
      });

  }).catch(() => {
    next();
  });
});

module.exports = router;
