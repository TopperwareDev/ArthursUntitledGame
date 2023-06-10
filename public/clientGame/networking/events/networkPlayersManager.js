class NetworkplayersManager {
  constructor(mainScene) {
    this.networkPlayers = [];
    this.mainScene = mainScene;
  }

  networkPlayersUpdate(stringifiedNetworkPlayers) {
    if (stringifiedNetworkPlayers.length == 0) {
      return;
    }

    this.networkPlayers = this.parseNetworkPlayers(stringifiedNetworkPlayers);
    console.log(this.networkPlayers);

 
  }

  parseNetworkPlayers(networkPlayers){
    let parsedNetworkPlayers = [];
    for(let i = 0; i < networkPlayers.length; ++i){
      const parsedNetworkPlayer = JSON.parse(networkPlayers[i]);
      parsedNetworkPlayers.push(parsedNetworkPlayer);
      if(i == networkPlayers.length - 1){
        return parsedNetworkPlayers;
      }
    }
  }
}
