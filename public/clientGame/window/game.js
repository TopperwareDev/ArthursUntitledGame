/*
    Game class 
*/

class Game {
  constructor() {
    addPhaserStylesheet();
    this.PhaserInstance = new SceneLoader(getHeight(), getWidth());
  }
}
