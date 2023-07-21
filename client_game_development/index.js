/*
    Phaser.js game, compiled into a webpack
*/

// import {Phaser} from "./src/utils/phaser.min.js";
// ^^^^
// ||||
// Do not import Phaser, as shown above. It impacts performance when compiling, hence phaser.js 
// must be imported in master html file.

// Create a Phaser game configuration object
const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  // Add game scenes, assets, and oather configurations as needed
  // ...
};

const game = new Phaser.Game(config);