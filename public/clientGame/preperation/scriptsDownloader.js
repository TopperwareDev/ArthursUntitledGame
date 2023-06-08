/*
    This file will download required scripts to run game
    A list of all required scripts can be found in clientGame/scripts.json
*/
const jsonPath = "clientGame/scripts.json";
const delay = 1000;
let total_scripts = 0;
let downloaded_scripts = 0;
let scriptsDataJSON;

fetch(jsonPath)
  .then((response) => response.json())
  .then((data) => {
    scriptsDataJSON = data;
    showFiles(scriptsDataJSON);
    downloadScript(scriptsDataJSON);
  });

function showFiles(scriptsDataJSON) {
  //Add css
  const downloadScriptCss = document.createElement("link");
  downloadScriptCss.rel = "stylesheet";
  downloadScriptCss.href = "clientGame/preperation/css/showScripts.css";
  document.body.appendChild(downloadScriptCss);

  //Total scripts text
  const scriptsInfo = document.createElement("p");
  total_scripts = scriptsDataJSON.length;
  scriptsInfo.innerHTML = "Total Scripts: " + total_scripts;
  document.body.appendChild(scriptsInfo);

  //Scripts Container
  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  scriptsDataJSON.forEach((scriptDataJSON) => {
    const scriptPath = scriptDataJSON.path;
    let scriptType = scriptDataJSON.type;

    if(scriptType == ''){
      scriptType = 'Not Module';
    }else{
      scriptType = 'Module';
    }
    
    const element = document.createElement("div");
    element.className = "element";
    element.id = scriptPath;
    container.appendChild(element);

    const elementHeader = document.createElement('p1');
    elementHeader.className = 'elementHeader';
    elementHeader.innerHTML = extractFileName(scriptPath);
    element.appendChild(elementHeader);

    const elementSubtext = document.createElement('p1');
    elementSubtext.className = 'elementSubtext';
    elementSubtext.innerHTML = 'Type: ' + scriptType;
    element.appendChild(elementSubtext);
  });

  function extractFileName(filePath) {
    const lastSlashIndex = filePath.lastIndexOf("/");
    return filePath.substring(lastSlashIndex + 1);
  }
}

function downloadScript(scriptsDataJSON) {
  const scriptDataJSON = scriptsDataJSON[downloaded_scripts];
  const scriptPath = scriptDataJSON.path;
  const scriptType = scriptDataJSON.type;

  const script = document.createElement("script");
  script.src = scriptPath;
  script.type = scriptType;
  document.head.appendChild(script);
  script.addEventListener("load", () => {
    const element = document.getElementById(scriptPath);
    element.style.backgroundColor = "green";
    ++downloaded_scripts;

    if (downloaded_scripts < total_scripts) {
      downloadScript(scriptsDataJSON); // Call downloadScript recursively for the next script
    } else {
      setTimeout(() => {
        document.body.innerHTML = "";

        import('../window/init/gameInitiator.js').then((gameInitiator) => {
          // Start game!
          gameInitiator.startGame();
        })
      }, delay);
    }
  });
}

