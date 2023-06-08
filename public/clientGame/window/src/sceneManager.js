export class SceneManager {
  constructor() {
    this.imports(() => {
      this.phaserStyleScript.addPhaserStylesheet(); // canvas css

      this.config = {
        type: Phaser.AUTO,
        width: this.windowDimensionsScript.getWidth(),
        height: this.windowDimensionsScript.getHeight(),
        scene: [new this.mainSceneScript.MainScene(this), this.LoadingSceneScript.LoadingScene],
      };
      this.game = new Phaser.Game(this.config);
    });
  }

  async imports(callback) {
    try {
      this.phaserStyleScript = await import("./style/phaserStyle.js");
      this.gameScript = await import("../../game.js");
      this.windowDimensionsScript = await import("./style/windowDimensions.js");
      this.mainSceneScript = await import("../scenes/mainScene.js");
      this.LoadingSceneScript = await import("../scenes/loadingScene.js");
      callback();
    } catch (error) {
      console.error("Failed to import scripts:", error);
    }
  }
}
