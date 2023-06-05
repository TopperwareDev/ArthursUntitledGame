const websocketManager = require("./src/websocketManager");
const connectedPlayersManager = require("./src/connectedplayersManager");

class NetworkManager {
  constructor() {
    this.players = [];
  }

  websocket(req, res) {
    websocketManager.websocket(
      req,
      (onMessage) => {
        //Websocket message
        console.log(onMessage);
      },
      (onClose) => {
        //onClose
        connectedPlayersManager.removePlayer(this.players, req);
      },
      (authenticated) => {
        //onConnect
        connectedPlayersManager
          .addPlayer(this.players, req)
          .then(() => {
            authenticated();
          })
          .catch((err) => {
            console.log("Error: " + err);
            res.send(err);
          });
      }
    );
  }
}

module.exports = { NetworkManager };
