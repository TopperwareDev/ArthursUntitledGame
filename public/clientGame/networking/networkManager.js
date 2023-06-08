export class NetworkManager {
  constructor(mainScene) {
    this.imports(() => {
      this.mainScene = mainScene;
      this.scene = this.mainScene.scene;
      this.scene.pause(); //pause while connecting to websocket
      this.eventManager = new this.eventManagerScript.EventManager(
        this.mainScene
      );

      this.websocketEventsScript.websocketconnect(
        this.onConnect.bind(this),
        this.onDisconnect.bind(this),
        this.onMessage.bind(this)
      );
    });
  }

  onConnect(websocket) {
    this.scene.resume(); //resume once connected to websocket
    this.websocket = websocket;
  }

  onDisconnect() {
    this.scene.stop();
  }

  onMessage(msg) {
    this.eventManager.EventHandler(msg);
  }

  emitEvent(eventType, eventData) {
    const event = this.eventFormatterScript.formatEvent(eventType, eventData);
    this.websocket.send(event);
  }

  async imports(callback) {
    try {
      this.eventManagerScript = await import(
        "../networking/src/eventManager.js"
      );
      this.websocketEventsScript = await import("./src/websocketEvents.js");
      this.eventFormatterScript = await import("./src/eventFormatter.js");
      callback();
    } catch (error) {
      console.error("Failed to import scripts:", error);
    }
  }
}
