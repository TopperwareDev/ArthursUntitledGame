/*
    This file will download required scripts to run game
    A list of all required scripts can be found in clientGame/scripts.json
*/

import { showFiles } from "./lib/visuals.js";
import { downloadScripts } from "./lib/download.js";

const jsonFilePath = "clientGame/scripts.json";
let total_scripts = 0;

fetch(jsonFilePath)
  .then((response) => response.json())
  .then((data) => {
    showFiles(data, total_scripts);
    downloadScripts(data, total_scripts, () => {
      console.log('done');
    });
  });