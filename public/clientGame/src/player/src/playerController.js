class PlayerController {
  constructor(player, maxSpeed, acceleration, deacceleration) {
    this.player = player;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.deacceleration = deacceleration;
    this.horizontalSpeed = 0;
    this.verticalSpeed = 0;
    this.cursors = {
      up: player.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: player.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.S
      ),
      left: player.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.A
      ),
      right: player.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.D
      ),
    };
  }

  update(time, deltaTime) {
    const { up, down, left, right } = this.cursors;

    // HORIZONTAL ACCELERATION AND DEACCELERATION
    if (left.isDown) {
      this.horizontalSpeed -= this.acceleration * deltaTime;
      if (this.horizontalSpeed < -this.maxSpeed) {
        this.horizontalSpeed = -this.maxSpeed;
      }
    } else if (right.isDown) {
      this.horizontalSpeed += this.acceleration * deltaTime;
      if (this.horizontalSpeed > this.maxSpeed) {
        this.horizontalSpeed = this.maxSpeed;
      }
    } else {
      // Apply deacceleration to gradually slow down the player
      if (this.horizontalSpeed > 0) {
        this.horizontalSpeed -= this.deacceleration * deltaTime;
        if (this.horizontalSpeed < 0) {
          this.horizontalSpeed = 0;
        }
      } else if (this.horizontalSpeed < 0) {
        this.horizontalSpeed += this.deacceleration * deltaTime;
        if (this.horizontalSpeed > 0) {
          this.horizontalSpeed = 0;
        }
      }
    }
    const horizontalMovement = this.horizontalSpeed * deltaTime;
    this.player.x += horizontalMovement;

    // VERTICAL ACCELERATION AND DEACCELERATION
    if (up.isDown) {
      this.verticalSpeed -= this.acceleration * deltaTime;
      if (this.verticalSpeed < -this.maxSpeed) {
        this.verticalSpeed = -this.maxSpeed;
      }
    } else if (down.isDown) {
      this.verticalSpeed += this.acceleration * deltaTime;
      if (this.verticalSpeed > this.maxSpeed) {
        this.verticalSpeed = this.maxSpeed;
      }
    } else {
      // Apply deacceleration to gradually slow down the player
      if (this.verticalSpeed > 0) {
        this.verticalSpeed -= this.deacceleration * deltaTime;
        if (this.verticalSpeed < 0) {
          this.verticalSpeed = 0;
        }
      } else if (this.verticalSpeed < 0) {
        this.verticalSpeed += this.deacceleration * deltaTime;
        if (this.verticalSpeed > 0) {
          this.verticalSpeed = 0;
        }
      }
    }
    const verticalMovement = this.verticalSpeed * deltaTime;
    this.player.y += verticalMovement;

    //update player sprite position
    this.player.updatePlayerPosition();
  }
}
