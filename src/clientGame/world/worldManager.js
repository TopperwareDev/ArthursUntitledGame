const NM = require('../networking/networkManager');

class WorldManager {
    constructor(worldName){
        this.worldName = worldName;
        this.networkManager = new NM.NetworkManager();
    }
}

module.exports = {WorldManager,};