/*
    Once the server starts this a json will all required scrips is created
    such that the client can download all required scripts easily
*/

const fs = require("fs");
const path = require("path");

const directory = "./public/clientGame";
const jsonFilePath = "./public/clientGame/scripts.json";
const directoryIgnore = "preperation";
const lowPriorityIndicator = "//LAST//";
const highPriorityIndicator = "//HIGH//";
const isNotModule = "//NOT-MODULE//";

function findJSFiles(directoryPath, callback) {
  const filesArray = [];
  const filesArrayLowPriority = [];
  const filesArrayHighPriority = [];

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory() && !filePath.includes(directoryIgnore)) {
        traverseDirectory(filePath);
      } else {
        if (filePath.endsWith(".js")) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          let modifiedPath = filePath.replace(/\\/g, "/");
          modifiedPath = modifiedPath.replace("public/", "");
          const scriptJSON = {path: undefined, type: undefined};

          if(fileContent.includes(isNotModule)){
            scriptJSON.type = '';
          }else{
            scriptJSON.type = 'module';
          }

          if (fileContent.includes(lowPriorityIndicator)) {
            scriptJSON.path = modifiedPath;
            filesArrayLowPriority.push(scriptJSON);
          } else if (fileContent.includes(highPriorityIndicator)) {
            scriptJSON.path = modifiedPath;
            filesArrayHighPriority.push(scriptJSON);
          } else {
            scriptJSON.path = modifiedPath;
            filesArray.push(scriptJSON);
          }
        }
      }
    });
  }

  traverseDirectory(directoryPath);

  if (callback) {
    const resultArray = filesArrayHighPriority.concat(
      filesArray,
      filesArrayLowPriority
    );
    callback(resultArray);
  }
}

function arrayToJson(array, callback) {
  const json = JSON.stringify(array, null, 2);

  callback(json);
}

function JSONtoFILE(jsonData, filePath, callback) {
  try {
    //first remove file if exists
    fs.unlinkSync(filePath);
  } catch (error) {
    console.log("JSON scripts did not previously exist, problem Fixed");
  }

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error(
        "There was an error generating the JSON dependencies file for the client",
        err
      );
      process.exit();
    } else {
      callback();
    }
  });
}

function init(callback) {
  findJSFiles(directory, (array) => {
    arrayToJson(array, (JSON) => {
      JSONtoFILE(JSON, jsonFilePath, () => {
        callback();
      });
    });
  });
}

module.exports = { init };
