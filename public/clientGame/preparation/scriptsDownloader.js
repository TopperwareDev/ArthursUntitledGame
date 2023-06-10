/*
    This file will download required scripts to run game
    A list of all required scripts can be found in clientGame/scripts.json
*/

const jsonFilePath = "clientGame/scripts.json";
const delay = 1000;
let total_scripts = 0;
let downloaded_scripts = 0;
let json;

fetch(jsonFilePath)
  .then((response) => response.json())
  .then((data) => {
    showFiles(data);
    json = data;
    downloadScript();
  });

function showFiles(json) {
  //Add css
  const downloadScriptCss = document.createElement("link");
  downloadScriptCss.rel = "stylesheet";
  downloadScriptCss.href = "clientGame/preparation/css/showScripts.css";
  document.body.appendChild(downloadScriptCss);

  //Total scripts text
  const scriptsInfo = document.createElement("p");
  total_scripts = json.length;
  scriptsInfo.innerHTML = "Total Scripts: " + total_scripts;
  document.body.appendChild(scriptsInfo);

  //Scripts Container
  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  json.forEach((scriptJSON) => {
    const element = document.createElement("div");
    element.className = "element";
    element.id = scriptJSON.fileHash;
    element.innerHTML = extractFileName(scriptJSON.filePath);
    container.appendChild(element);
  });

  function extractFileName(filePath) {
    const lastSlashIndex = filePath.lastIndexOf("/");
    return filePath.substring(lastSlashIndex + 1);
  }
}

function downloadScript() {
  const scriptJSON = json[downloaded_scripts];
  const script = document.createElement("script");
  script.src = scriptJSON.filePath;
  document.head.appendChild(script);
  script.addEventListener("load", () => {
    const element = document.getElementById(scriptJSON.fileHash);
    element.style.backgroundColor = "green";
    ++downloaded_scripts;

    if (downloaded_scripts < total_scripts) {
      downloadScript(); // Call downloadScript recursively for the next script
    } else {
      setTimeout(() => {
        document.body.innerHTML = "";

        // Start game!
        startGame();
      }, delay);
    }
  });
}

