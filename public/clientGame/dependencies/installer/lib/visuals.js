//LIB//

const cssPath = "clientGame/dependencies/installer/css/showScripts.css";

export function showFiles(json, total_scripts) {
    //Add css
    const downloadScriptCss = document.createElement("link");
    downloadScriptCss.rel = "stylesheet";
    downloadScriptCss.href = cssPath;
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