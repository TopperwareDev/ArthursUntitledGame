class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    // Load your assets for the loading scene here
  }

  create() {
    // Perform any loading operations

    // Once loading is complete, start the main scene
    this.scene.start("MainScene");
  }
}
