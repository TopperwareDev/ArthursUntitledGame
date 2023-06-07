class NetworkManager {
  constructor(mainScene) {
    this.mainScene = mainScene;
    this.scene = this.mainScene.scene;
    this.scene.pause(); //pause while connecting to websocket
    this.eventManager = new EventManager(this.mainScene)

    websocketconnect(
      this.onConnect.bind(this),
      this.onDisconnect.bind(this),
      this.onMessage.bind(this),
    );
  }

  onConnect(websocket) {
    this.scene.resume(); //resume once connected to websocket
    this.websocket = websocket;
  }

  onDisconnect() {
    this.scene.stop();
  }

  onMessage(msg){
    this.eventManager.EventHandler(msg);
  }

  emitEvent(eventType, eventData){
    const event = formatEvent(eventType, eventData);
    this.websocket.send(event);
  }
}
