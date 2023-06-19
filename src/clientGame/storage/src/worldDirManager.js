const crypto = require("crypto");
const fs = require("fs");

const defaultDirPath = __dirname + "/../worlds/";

function createNewWorldDIR(worldID, callback) {
  /*
        Creates new world file structure and return world id

        if already existing worldID is given then worldID is returned

        if nonexisistng worldID is given then new world is created and new world ID is returned
    */

  const worldDirPath = defaultDirPath + worldID;

  fs.access(worldDirPath, fs.constants.F_OK, (error) => {
    if (error) {
      //World does not exsist
      createNewDir(defaultDirPath);
    } else {
      //World exists
      //Return world id
      callback(worldID);
      return;
    }
  });

  function createNewDir(defaultDirPath) {
    const uniqueId = crypto.randomBytes(16).toString("hex");

    const worldDirPath = defaultDirPath + uniqueId;

    fs.mkdir(worldDirPath, (error) => {
      if (error) {
        console.log(error);
        process.exit();
      } else {
        callback(uniqueId);
        return;
      }
    });
  }
}

function checkWorldsDir() {
  /*
    check if worlds dir is created 
    if not created create new dir 
  */
  if (!fs.existsSync(defaultDirPath)) {
    fs.mkdirSync(defaultDirPath);
  }
}

module.exports = { createNewWorldDIR, checkWorldsDir };
