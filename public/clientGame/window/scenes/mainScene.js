class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    preloadPlayerSprites(this.load);
  }

  create() {
    defaultSceneSettings(this);
    this.networkManager = new NetworkManager(this);
    //this.sprite1 = this.scene.add.sprite(500, 500, "player");
    this.player = new Player(this);
  }

  update(time, deltaTime) {
    this.player.update(time, deltaTime);
  }
}
