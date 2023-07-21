/*
    Phaser.js game, compiled into a webpack
*/

// import {Phaser} from "./src/utils/phaser.min.js";
// ^^^^
// ||||
// Do not import Phaser, as shown above. It impacts performance when compiling, hence phaser.js 
// must be imported in master html file.

import game_config from "./configuration/game_config.json"

const game = new Phaser.Game(game_config);