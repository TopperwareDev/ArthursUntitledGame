/*
    Game class 
*/

//LAST//

import { Window } from "./dependencies/window/index.js";

export function startGame(){
  const game = new Game();
}

class Game {
  constructor() {
    console.log('Game class create and game is ready');
    const window = new Window;
  }
}
