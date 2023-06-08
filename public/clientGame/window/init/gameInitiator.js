/* 
    This script is responsible for creating game object
    
    Window referes to the window/broser where the game is played in
*/

export function startGame() {
  import("../../game.js").then((gameScript) => {
    const Game = new gameScript.Game();
  });
}
