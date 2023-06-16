const websocketUpgrade = require("../httpUpgradeToWebsocket");

function websocket(req, onMessage, onClose, onConnect) {
  websocketUpgrade.upgrade(req).then((ws) => {
    onConnect(() => {
      /* 
        returns onConnect, onClose, onMessage
      */
      ws.on("message", function incoming(message) {
        onMessage(message);
      });

      ws.on("close", function close(err) {
        onClose(err);
      });
    });
  });
}

module.exports = { websocket };
