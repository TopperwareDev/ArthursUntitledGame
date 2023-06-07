/*
    Function used to manage websocket events
*/

const httpUpgradeToWebsocket = require("./httpUpgradeToWebsocket");

function websocketEvents(req, OnConnect, OnDissconnect, onMessage) {
  httpUpgradeToWebsocket.upgrade(req).then((websocketConnection) => {
    //return OnConnect
    OnConnect(websocketConnection);

    websocketConnection.on("message", function incoming(message) {
      onMessage(message);
    });

    websocketConnection.on("close", function close(err) {
        OnDissconnect(err);
    });
  });
}

module.exports = { websocketEvents };
