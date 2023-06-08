class NetworkPlayerElement {
  constructor(scene) {
    this.x = 500;
    this.y = 500;
    this.scale = 0.1;
    this.scene = scene;
    this.sprite = this.scene.add.sprite(this.x, this.y, "networkPlayer");
    this.sprite.setScale(0.1);
  }

  update(time, deltaTime) {
    // Update networkPlayer logic goes here

  }

  updatePlayerPosition() {
    this.sprite.setPosition(this.x, this.y);
  }
}
