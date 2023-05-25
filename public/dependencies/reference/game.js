const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
/*
let player;
let cursors;
const player_speed = 5;
let coordinatesText;
*/

function startGame() {
  const game = new Phaser.Game(config);
}

function preload() {
  loadAllSprites(this.load);
}

function create() {
  this.cameras.main.setBackgroundColor("#00FF00");
  const player = new Player(this, "player");
}

function update() {
  
}
