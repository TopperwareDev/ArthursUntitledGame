
import { update_window_data } from "./src/lib/window_data";

const browser_window_configuration = update_window_data();

const config = {
  height: browser_window_configuration.browser_height,
  width: browser_window_configuration.browser_width,
  type: Phaser.AUTO,
  // Add game scenes, assets, and oather configurations as needed
  // ...
};

const game = new Phaser.Game(config);