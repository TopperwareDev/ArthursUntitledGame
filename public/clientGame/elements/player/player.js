class Player {
  constructor(scene) {
    this.x = 600;
    this.y = 500;
    this.scale = 0.1;
    this.scene = scene;
    
    this.sprite = this.scene.add.sprite(this.x, this.y, "null");
    this.sprite.setScale(0.1);
    
    //dynamically add a image to the sprite
    player_preload.preloadPlayerSprite(this.scene, 'player', () => {
      this.sprite.setTexture("player");
    });
    

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

    //networking
    this.networkManager = this.scene.networkManager;
    this.networkPlayer = new NetworkPlayer(this);
  }

  update(time, deltaTime) {
    // Update player logic goes here
    this.playerController.update(time, deltaTime);
    this.networkPlayer.networkUpdate(time, deltaTime, this);
  }

  updatePlayerPosition() {
    this.sprite.setPosition(this.x, this.y);
  }
}
