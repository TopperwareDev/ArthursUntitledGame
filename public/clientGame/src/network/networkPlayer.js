class NetworkPlayer {
  constructor() {
    this.isOwner = true;
    this.networkUpdateFrequency = 1; //# pr seccond
    this.previousNetworkUpdate = 0;

    this.networkPlayer_x = 0;
    this.networkPlayer_y = 0;
  }

  networkUpdate(time, deltaTime, player) {
    if (this.checkUpdate(deltaTime)) {
        console.log('network update now');
    }
  }

  checkUpdate(deltaTime) {
    this.previousNetworkUpdate += deltaTime;
    const updateInterval = 1000 / this.networkUpdateFrequency;
    if (this.previousNetworkUpdate >= updateInterval) {
      this.previousNetworkUpdate = 0;
      return true;
    } else {
      return false;
    }
  }
}
