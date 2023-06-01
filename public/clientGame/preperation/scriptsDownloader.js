/*
    This file will download required scripts to run game
    A list of all required scripts can be found in clientGame/scripts.json
*/

const jsonPath = "clientGame/scripts.json";
const delay = 1000;
let total_scripts = 0;
let downloaded_scripts = 0;
let json;

fetch(jsonPath)
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
  downloadScriptCss.href = "clientGame/preperation/css/showScripts.css";
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

  json.forEach((script) => {
    const element = document.createElement("div");
    element.className = "element";
    element.id = script;
    element.innerHTML = extractFileName(script);
    container.appendChild(element);
  });

  function extractFileName(filePath) {
    const lastSlashIndex = filePath.lastIndexOf("/");
    return filePath.substring(lastSlashIndex + 1);
  }
}

function downloadScript() {
  const scriptPath = json[downloaded_scripts];
  const script = document.createElement("script");
  script.src = scriptPath;
  document.head.appendChild(script);
  script.addEventListener("load", () => {
    const element = document.getElementById(scriptPath);
    element.style.backgroundColor = "green";
    ++downloaded_scripts;

    if (downloaded_scripts < total_scripts) {
      downloadScript(); // Call downloadScript recursively for the next script
    } else {
      setTimeout(() => {
        document.body.innerHTML = "";

        // Start game!
        startWindow();
      }, delay);
    }
  });
}

