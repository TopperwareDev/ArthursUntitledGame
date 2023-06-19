import { nativeBrowserHeight, nativeBrowserWidth } from "./lib/getBrowserConfiguration.js";
import 

export class Window {
  constructor() {
    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      width: nativeBrowserWidth(),
      height: nativeBrowserHeight(),
      // other game configuration options
    };

    // Create a new Phaser game instance
    this.game = new Phaser.Game(config);

    // Register the scenes
    //this.game.scene.add("MainMenu", MainMenuScene);
    this.game.scene.add("worldScene", GameplayScene);
    // Add more scenes as needed

    // Start the initial scene
    this.game.scene.start("MainMenu");
  }
}
