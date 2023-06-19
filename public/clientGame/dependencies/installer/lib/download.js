//LIB//

const delayAfterScriptsDownloaded = 1000;

export function downloadScripts(data, total_scripts, callback) {
    let downloaded_scripts = 0;
  
    const scriptJSON = data[downloaded_scripts];
    const script = document.createElement("script");
    script.src = scriptJSON.filePath;
    script.addEventListener("load", () => {
      const element = document.getElementById(scriptJSON.fileHash);
      element.style.backgroundColor = "green";
      ++downloaded_scripts;
  
      if (downloaded_scripts < total_scripts) {
        downloadScripts(); // Call downloadScript recursively for the next script
      } else {
        setTimeout(() => {
          document.body.innerHTML = "";
  
          // Done!
          callback();
        }, delayAfterScriptsDownloaded);
      }
    });
  
    //Script.Module
    if(scriptJSON.isModule){
      script.type = "module";
    }else{
      script.type = "";
    }
    
    document.head.appendChild(script);
  }