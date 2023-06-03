class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    preloadPlayerSprites(this.load);
  }

  create() {
    defaultSceneSettings(this);
    this.player = new Player(this);
  }

  update(time, deltaTime) {
    this.player.update(time, deltaTime);
  }
}