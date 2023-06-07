const eventManager = require("./src/eventManager");
const websocketEvents = require("./src/websocketEvents");

class NetworkManager {
  constructor(world) {
    this.worldID = world.worldID;
    this.eventManager = new eventManager.EventManager(this.worldID);
  }

  websocketHandler(req, res) {
    let websocketconnection;
    websocketEvents.websocketEvents(
      req,
      function OnConnect(websocketConnection) {
        websocketconnection = websocketConnection;

      }.bind(this),
      function OnDissconnect() {
        //connection to user has been
      },
      function OnMessage(msg) {
        this.eventManager.EventHandler(msg, req, websocketconnection);
      }.bind(this),
    );
  }
}

module.exports = { NetworkManager };
