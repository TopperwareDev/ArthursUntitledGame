const networkManager = require("../networking/networkManager");
const worldDirManager = require("./storage/src/worldDirManager");

class WorldManager {
  constructor(worldID) {
    worldDirManager.checkWorldsDir();
    worldDirManager.createNewWorldDIR(worldID, (worldID) => {
      this.worldID = worldID;
      this.networkManager = new networkManager.NetworkManager(this);
    });
  }
}

module.exports = { WorldManager };
