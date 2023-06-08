export class MainScene extends Phaser.Scene {
  constructor(sceneManager) {
    super({ key: "MainScene" });
    this.imports(() => {
      this.preloadPlayerScript.preloadPlayerSprites(this.load);
      this.defaultSceneSettingsScript.defaultSceneSettings(this);
      this.networkManager = new this.networkmanagerScript.NetworkManager(this);
      this.player = new this.playerScript.Player(this);
    });
  }

  update(time, deltaTime) {
    this.player.update(time, deltaTime);
  }

  async imports(callback) {
    try {
      this.preloadPlayerScript = await import(
        "../../elements/player/src/preloadPlayer.js"
      );
      this.defaultSceneSettingsScript = await import(
        "../scenes/src/defaultSceneSettings.js"
      );
      this.networkmanagerScript = await import(
        "../../networking/networkManager.js"
      );
      this.playerScript = await import("../../elements/player/player.js");
      callback();
    } catch (error) {
      console.error("Failed to import scripts:", error);
    }
  }
}
