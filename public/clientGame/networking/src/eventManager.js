export class EventManager {
  constructor(mainScene) {
    this.mainScene = mainScene;
    this.networkPlayersManager = new NetworkplayersManager(this.mainScene);
  }

  EventHandler(msg) {
    const parsedMessage = this.parseMessage(msg);
    switch (parsedMessage.event) {
      case "networkPlayers":
        const data = parsedMessage.data;
        this.networkPlayersManager.networkPlayersUpdate(data);
        break;
    }
  }

  parseMessage(onMessage) {
    const decodedMessage = onMessage.toString("utf8");
    const parsedDecodedMessage = JSON.parse(decodedMessage);
    parsedDecodedMessage.data = JSON.parse(parsedDecodedMessage.data);
    return parsedDecodedMessage;
  }
}
