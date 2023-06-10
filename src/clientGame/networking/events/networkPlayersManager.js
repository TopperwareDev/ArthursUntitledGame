const eventFormatter = require("../src/eventFormatter");

class NetworkPlayersManager {
  constructor() {
    this.networkPlayers = [];
    this.maximumInactivityDuration = 1000; //1 seccond
  }

  networkPlayerUpdate(
    networkPlayerData,
    accountID,
    sessionID,
    websocketconnection
  ) {
    this.removeInactiveNetworkPlayers();
    this.consoleLogNetworkPlayers();

    this.isSessionValid(accountID, sessionID, (state) => {
      if (state == 1) {
        this.updateNetworkPlayer(accountID, networkPlayerData);
      } else if (state == 2) {
        this.addNetworkPlayer(accountID, sessionID);
        this.updateNetworkPlayer(accountID, networkPlayerData);
      } else if (state == 3) {
        websocketconnection.close();
      }
    });

    this.emitAllOtherNetworkPlayers(accountID, websocketconnection);
  }

  consoleLogNetworkPlayers(){
    console.clear();
    console.log(this.networkPlayers);
  }

  isSessionValid(accountID, sessionID, callback) {
    /*
        Callback:
        1 -> SessionID corrolates to network player
        2 -> New network player is detected
        3 -> SessionID does not own network player
    */
    if (this.networkPlayers.length == 0) {
      //IF networkPlayers[] is empty
      callback(2);
      return;
    }

    for (let i = 0; i < this.networkPlayers.length; i++) {
      if (
        this.networkPlayers[i].sessionID == sessionID &&
        this.networkPlayers[i].accountID == accountID
      ) {
        callback(1);
        return;
      } else if (i == this.networkPlayers.length - 1) {
        //session is solo
        for (let i = 0; i < this.networkPlayers.length; i++) {
          if (this.networkPlayers[i].accountID == accountID) {
            //this account already has a network player
            //this means incoming is a duplicate
            callback(3);
            return;
          } else if (i == this.networkPlayers.length - 1) {
            //session is solo and account is solo
            callback(2);
            return;
          }
        }
      }
    }
  }

  addNetworkPlayer(accountID, sessionID) {
    const json = {
      accountID: accountID,
      sessionID: sessionID,
      x: undefined,
      y: undefined,
      timeSinceLastUpdate: undefined,
    };
    this.networkPlayers.push(json);
  }

  updateNetworkPlayer(accountID, networkPlayerData) {
    const networkPlayer = this.networkPlayers.find(
      (networkPlayer) => networkPlayer.accountID === accountID
    );

    networkPlayer.x = networkPlayerData.playerX;
    networkPlayer.y = networkPlayerData.playerY;
    const currentTime = new Date().getTime();
    networkPlayer.timeSinceLastUpdate = currentTime;
  }

  removeInactiveNetworkPlayers() {
    const currentTime = new Date().getTime();
    this.networkPlayers = this.networkPlayers.filter((networkPlayer) => {
      const timePassedSinceLastUpdate =
        currentTime - networkPlayer.timeSinceLastUpdate;
      return timePassedSinceLastUpdate <= this.maximumInactivityDuration;
    });
  }

  compileAllOtherNetworkPlayers(accountID, callback) {
    let networkPlayersJSON = [];
    for (let i = 0; i < this.networkPlayers.length; i++) {
      if (this.networkPlayers[i].accountID !== accountID) {
        const networkPlayerData = {
          playerX: this.networkPlayers[i].x,
          playerY: this.networkPlayers[i].y,
        };
        const stringifiedNetworkPlayer = JSON.stringify(networkPlayerData);
        networkPlayersJSON.push(stringifiedNetworkPlayer);
      }
      if (i === this.networkPlayers.length - 1) {
        callback(
          eventFormatter.formatEvent("networkPlayers", networkPlayersJSON)
        );
      }
    }
  }

  emitAllOtherNetworkPlayers(accountID, websocketconnection) {
    this.compileAllOtherNetworkPlayers(accountID, (formattedData) => {
      websocketconnection.send(formattedData);
    });
  }
}

module.exports = { NetworkPlayersManager };
