/*
    Game class 
*/
//LAST//
class Game {
  constructor() {
    websocketconnect(this.onConnect.bind(this), this.onDissconnect.bind(this));
  }

  onConnect(websocket){
    this.sceneManager = new SceneManager(websocket);
  }

  onDissconnect(){
    //switch scene
    console.log('Connection to webserver has been lost');
    this.sceneManager.stop();
  }
}
