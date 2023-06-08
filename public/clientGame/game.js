/*
    Game class 
*/
//LAST//
export class Game {
  constructor() {
    this.imports(() => {
      this.sceneManager = new this.sceneManagerScript.SceneManager();
    });
  }

  async imports(callback) {
    try {
      this.sceneManagerScript = await import("./window/src/sceneManager.js");
      callback();
      
    } catch (error) {
      console.error("Failed to import scripts:", error);
    }
  }
}
