/*
    This file will download required scripts to run game
    A list of all required scripts can be found in clientGame/scripts.json
*/

import { showFiles } from "./lib/visuals.js";
import { downloadScripts } from "./lib/download.js";
import { startGame } from "../../game.js";

const jsonFilePath = "clientGame/scripts.json";

fetch(jsonFilePath)
  .then((response) => response.json())
  .then((data) => {
    showFiles(data);
    downloadScripts(data, function() {
      startGame();
    });
  });