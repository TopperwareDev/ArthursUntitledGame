class SceneManager {
  constructor(websocket) {
    addPhaserStylesheet(); //canvas css

    this.websocket = websocket;

    this.config = {
      type: Phaser.AUTO,
      width: getWidth(),
      height: getHeight(),
      scene: [MainScene, LoadingScene],
    };

    this.game = new Phaser.Game(this.config);
  }

  stop(){
    this.game.destroy();
    //remove canvas 
    document.body.innerHTML = '<h1>ERROR CONNECTING TO SERVER PLEASE RETURN TO HOME PAGE. </h1> <br> This is most likely because someone is already playing on this account.';

  }
}
