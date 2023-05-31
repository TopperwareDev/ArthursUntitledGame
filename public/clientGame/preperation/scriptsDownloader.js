/*
    This file will download required scripts to run game
    A list of all required scripts can be found in clientGame/scripts.json
*/

const jsonPath = "clientGame/scripts.json";
let total_scripts = 0;
let downloaded_scripts = 0;

fetch(jsonPath)
  .then((response) => response.json())
  .then((json) => {
    showFiles(json);
  });

function showFiles(json) {
  const list = document.createElement("ul");
  json.forEach((script) => {
    const listItem = document.createElement("li");
    listItem.textContent = script;
    listItem.id = script;
    list.appendChild(listItem);
  });
  const scriptsInfo = document.createElement('p');
  total_scripts = json.length;
  scriptsInfo.innerHTML = 'Total Scripts: ' + total_scripts;
  document.body.appendChild(scriptsInfo);
  document.body.appendChild(list);
}

function downloadScript(scriptPath) {
  const script = document.createElement("script");
  script.src = scriptPath;
  script.addEventListener("load", () => {
    const scriptListElement = document.getElementById(scriptPath);
    scriptListElement.style.color = "green";
  });
}
