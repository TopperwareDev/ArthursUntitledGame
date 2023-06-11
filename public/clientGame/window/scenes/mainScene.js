class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    
  }

  create() {
    defaultSceneSettings(this);
    this.networkManager = new NetworkManager(this);
    this.player = new Player(this);
  }

  update(time, deltaTime) {
    this.player.update(time, deltaTime);
  }
}
