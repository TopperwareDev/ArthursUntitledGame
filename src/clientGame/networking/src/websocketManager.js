const websocketUpgrade = require("./websocketUpgrade");

function websocket(req, onMessage, onClose, onConnect) {
  websocketUpgrade.upgrade(req).then((ws) => {
    onConnect(() => {
      /* 
        onConnect function needs to validate websocket connection to user
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
