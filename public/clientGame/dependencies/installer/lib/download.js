//LIB//

const delayAfterScriptsDownloaded = 1000;
let downloaded_scripts = 0;

export function downloadScripts(data, callback) {
  const total_scripts = data.length;

  const scriptJSON = data[downloaded_scripts];
  const script = document.createElement("script");
  script.src = scriptJSON.filePath;
  script.addEventListener("load", () => {
    const element = document.getElementById(scriptJSON.fileHash);
    element.style.backgroundColor = "green";
    ++downloaded_scripts;

    if (downloaded_scripts < total_scripts) {
      downloadScripts(data, callback); // Call downloadScript recursively for the next script
    } else {
      setTimeout(() => {
        document.body.innerHTML = "";

        // Done!
        callback();
      }, delayAfterScriptsDownloaded);
    }
  });

  //Script.Module
  if (scriptJSON.isModule) {
    script.type = "module";
  } else {
    script.type = "";
  }

  document.head.appendChild(script);
}
