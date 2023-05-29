/*
    Once the server starts this a json will all required scrips is created
    such that the client can download all required scripts easily
*/

const fs = require("fs");
const path = require("path");

const directory = "./public/clientGame";
const jsonFilePath = "./public/clientGame/scripts.json";

function findJSFiles(directoryPath, callback) {
  const filesArray = []; // Create an array to store the file paths

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        traverseDirectory(filePath); // Recursive call for subdirectories
      } else {
        //does file contain .js
        if (filePath.includes(".js")) {
          //remove "public/"
          const modifiedPath = filePath.replace("public/", "");
          filesArray.push(modifiedPath); // Append file path to the array
        }
      }
    });
  }

  traverseDirectory(directoryPath); // Start traversing the directory

  if (callback) {
    callback(filesArray); // Invoke the callback with the resulting array
  }
}

function arrayToJson(array, callback) {
  const json = JSON.stringify(array, null, 2);

  callback(json);
}

function JSONtoFILE(jsonData, filePath, callback) {
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error(
        "There was an error generating the JSON dependencies file for the client",
        err
      );
      process.exit();
    } else {
      console.log("JSON data written to file successfully.");
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
