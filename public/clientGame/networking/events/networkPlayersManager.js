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

    this.createPlayers();
  }

  createPlayers() {

    // Create new players and put them at coordinates
    this.networkPlayers.forEach((networkPlayer) => {
      const x = networkPlayer.playerX;
      const y = networkPlayer.playerY;

      this.mainScene.add.sprite(x, y, 'player');
    });
  }
}
