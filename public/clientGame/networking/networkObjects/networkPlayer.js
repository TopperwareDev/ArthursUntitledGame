class NetworkPlayer {
  constructor(player) {
    this.isOwner = true;
    this.networkUpdateFrequency = 1; //# pr seccond
    this.previousNetworkUpdate = 0;

    this.player = player;
    this.networkManager = player.networkManager;
  }

  networkUpdate(time, deltaTime, player) {
    this.updateCycle(deltaTime, () => {
      this.networkManager.emitEvent("networkPlayer", {
        playerX: this.player.x,
        playerY: this.player.y,
      });
    });
  }

  updateCycle(deltaTime, callback) {
    this.previousNetworkUpdate += deltaTime;
    const updateInterval = 1000 / this.networkUpdateFrequency;
    if (this.previousNetworkUpdate >= updateInterval) {
      this.previousNetworkUpdate = 0;
      callback();
    }
  }
}
