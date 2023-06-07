/*
    The websocket is will be used for multiple purposes hence multiple 
    events are transmitted using the same socket. Each message sent over 
    the web socket is a different event hence the eventmanager is responsible 
    for detecting the event and transfering the data to the respective event 
    handler script to preform an action on the server.

    Events are given as "{event: 'event_name', data: {}}"
*/
const networkPlayersManager = require("../events/networkPlayersManager");

class EventManager {
  constructor(worldID) {
    this.worldID = worldID;
    this.networkPlayersManager = new networkPlayersManager.NetworkPlayersManager();
  }

  EventHandler(message, req, websocketconnection) {
    const parsedMessage = this.parseMessage(message);
    const accountID = req.session.accountID;
    const sessionID = req.session.id;
    switch (parsedMessage.event) {
      case "networkPlayer":
        const parsedMessageData = parsedMessage.data;
        this.networkPlayersManager.networkPlayerUpdate(
          parsedMessageData,
          accountID,
          sessionID,
          websocketconnection
        );
        break;
    }
  }

  parseMessage(onMessage) {
    const messageBuffer = Buffer.from(onMessage);
    const decodedMessage = messageBuffer.toString("utf8");
    const parsedDecodedMessage = JSON.parse(decodedMessage);
    parsedDecodedMessage.data = JSON.parse(parsedDecodedMessage.data);
    return parsedDecodedMessage;
  }
}

module.exports = { EventManager };
