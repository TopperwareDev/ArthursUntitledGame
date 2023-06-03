class Player {
  constructor(scene) {
    this.x = 600;
    this.y = 500;
    this.scale = 0.1;
    this.scene = scene;
    this.sprite = this.scene.add.sprite(this.x, this.y, "player");
    this.sprite.setScale(0.1);

    //PlayerController (Movement)
    this.MaxSpeed = 0.2;
    this.acceleration = 0.01;
    this.deacceleration = 0.0005;
    this.playerController = new PlayerController(
      this, //player object
      this.MaxSpeed, 
      this.acceleration,
      this.deacceleration //slowdown of player
    );
  }

  update(time, deltaTime) {
    // Update player logic goes here
    this.playerController.update(time, deltaTime);
  }

  updatePlayerPosition(){
    this.sprite.setPosition(this.x, this.y);
  }
}
