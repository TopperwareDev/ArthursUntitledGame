class NetworkplayersManager {
  constructor(mainScene) {
    this.networkPlayers = [];
    this.mainScene = mainScene;
  }

  networkPlayersUpdate(networkPlayers) {
    if (networkPlayers.length == 0) {
      return;
    }

    this.networkPlayers = [];
    networkPlayers.forEach((networkPlayer) => {
      const parsedNetworkPlayer = JSON.parse(networkPlayer);
      this.networkPlayers.push(parsedNetworkPlayer);
    });

    console.log(this.networkPlayers);
  }

  
}
