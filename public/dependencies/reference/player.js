class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, texture) {
    super(scene, 50, 50, texture);
    this.setScale(5);
    this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.events.on("update", this.update, this);
    this.keys = this.scene.input.keyboard.createCursorKeys();
    this.playerSpeed = 5;

    this.player_debug = false;

    // Create a separate HUD layer
    this.hud = this.scene.add.container();
    this.hud.setScrollFactor(0); // Make the HUD fixed on the screen

    // Create a text object to display debug info
    this.debugText = this.scene.add.text(10, 10, "", {
      fontSize: "16px",
      fill: "#ffffff",
    });
    this.hud.add(this.debugText); // Add the debug text to the HUD container

    // Set camera to follow the player
    this.scene.cameras.main.startFollow(this);
    // Set a deadzone for the camera
    this.scene.cameras.main.setDeadzone(
      this.scene.scale.width * 0.5,
      this.scene.scale.height * 0.5
    );
  }

  update() {
    this.movement();
    this.debug();
    this.updateDebugText();
    this.sendPlayerPosition();
  }

  movement() {
    if (this.keys.up.isDown) {
      this.y -= this.playerSpeed;
    } else if (this.keys.down.isDown) {
      this.y += this.playerSpeed;
    }

    if (this.keys.left.isDown) {
      this.x -= this.playerSpeed;
    } else if (this.keys.right.isDown) {
      this.x += this.playerSpeed;
    }
  }

  debug() {
    const debugKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.PERIOD
    );

    if (Phaser.Input.Keyboard.JustDown(debugKey)) {
      this.player_debug = !this.player_debug;
      console.log("Player Debug:", this.player_debug);
    }
  }

  updateDebugText() {
    if (this.player_debug) {
      const fps = this.scene.game.loop.actualFps.toFixed(2);
      this.debugText.setText(
        `FPS: ${fps}\nX: ${this.x.toFixed(2)}, Y: ${this.y.toFixed(2)}`
      );
    } else {
      this.debugText.setText("");
    }
  }

  sendPlayerPosition() {
    
  }
  
}
