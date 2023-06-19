const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const directory = "./public/clientGame";
const jsonFilePath = "./public/clientGame/scripts.json";
const fileIgnore = "public/clientGame/dependencies/installer/index.js";
const lowPriorityIndicator = "//LAST//";
const isLibIndicator = "//LIB//"; //Must be imported first
const notModuleIndicator = "//NOTMODULE//";

function findJSFiles(directoryPath, callback) {
  const filesArray = [];
  const filesArrayLowPriority = [];
  const filesArrayHighPriority = [];

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (filePath.endsWith(".js") && filePath != fileIgnore) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const modifiedPath = filePath
          .replace(/\\/g, "/")
          .replace("public/", "");
        const fileJSON = {
          fileName: path.basename(filePath),
          filePath: undefined,
          fileHash: undefined,
          fileSize_bytes: undefined,
          fileSize_megabytes: undefined,
          isModule: false,
          isLibrary: false,
        };

        fileJSON.fileHash = calculateSHA256Hash(fileContent);
        fileJSON.fileSize_bytes = fileStat.size;
        fileJSON.fileSize_megabytes = bytesToMegabytes(fileStat.size);

        if (!fileContent.includes(notModuleIndicator)) {
          fileJSON.isModule = true;
        }

        if (fileContent.includes(lowPriorityIndicator)) {
          fileJSON.filePath = modifiedPath;
          filesArrayLowPriority.push(fileJSON);
        } else if (fileContent.includes(isLibIndicator)) {
          fileJSON.filePath = modifiedPath;
          fileJSON.isLibrary = true;
          filesArrayHighPriority.push(fileJSON);
        } else {
          fileJSON.filePath = modifiedPath;
          filesArray.push(fileJSON);
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
    // Remove the file if it exists
    fs.unlinkSync(filePath);
  } catch (error) {
    console.log("JSON scripts did not previously exist. Problem fixed.");
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

function bytesToMegabytes(bytes) {
  const megabytes = bytes / (1024 * 1024);
  return parseFloat(megabytes.toFixed(2));
}

function init(callback) {
  // Find all JavaScript files in the directory and generate the JSON file
  findJSFiles(directory, (array) => {
    arrayToJson(array, (json) => {
      JSONtoFILE(json, jsonFilePath, () => {
        callback();
      });
    });
  });
}

function calculateSHA256Hash(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  const hashValue = hash.digest("hex");
  return hashValue;
}

module.exports = { init };
