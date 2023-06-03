class SceneLoader {
  constructor(height, width) {
    this.config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      scene: [MainScene, LoadingScene],
    };

    this.game = new Phaser.Game(this.config);
  }
}