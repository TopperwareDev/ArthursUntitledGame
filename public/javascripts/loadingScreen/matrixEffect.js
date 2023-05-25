let matrixEffect;
let canvas1;
let canvas2;

function startLoadingScreenAnimation() {
  // Create the first canvas element
  canvas1 = document.createElement("canvas");
  canvas1.id = "canvas";
  canvas1.className = "display";
  canvas1.style.position = "absolute";
  canvas1.style.top = "0";
  canvas1.style.left = "0";

  // Create the second canvas element
  canvas2 = document.createElement("canvas");
  canvas2.id = "canvas2";
  canvas2.className = "display";
  canvas2.style.position = "absolute";
  canvas2.style.top = "0";
  canvas2.style.left = "0";

  // Append the elements to the document body or any desired parent element
  document.body.appendChild(canvas1);
  document.body.appendChild(canvas2);

  startEffect();
}

function stopLoadingScreenAnimation() {
  // Remove or hide the loading screen elements
  document.body.removeChild(canvas1);
  document.body.removeChild(canvas2);
}

/*
    This is not my code
    credit: https://codepen.io/riazxrazor/pen/Gjomdp
    Riaz Laskar
    THANKS!!!
*/

function startEffect() {
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    canvas2 = document.getElementById("canvas2"),
    ctx2 = canvas2.getContext("2d"),
    // full screen dimensions
    cw = window.innerWidth,
    ch = window.innerHeight,
    charArr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    fallingCharArr = [],
    fontSize = 20,
    maxColums = cw / fontSize;
  canvas.width = canvas2.width = cw;
  canvas.height = canvas2.height = ch;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.draw = function (ctx) {
    this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
    this.speed = randomFloat(0.1, 10);

    ctx2.fillStyle = "rgba(255,255,255,0.8)";
    ctx2.font = fontSize + "px san-serif";
    ctx2.fillText(this.value, this.x, this.y);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px san-serif";
    ctx.fillText(this.value, this.x, this.y);

    this.y += this.speed;
    if (this.y > ch) {
      this.y = randomFloat(-100, 0);
      this.speed = randomFloat(2, 5);
    }
  };

  for (var i = 0; i < maxColums; i++) {
    fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
  }

  var update = function () {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, cw, ch);

    ctx2.clearRect(0, 0, cw, ch);

    var i = fallingCharArr.length;

    while (i--) {
      fallingCharArr[i].draw(ctx);
      var v = fallingCharArr[i];
    }

    requestAnimationFrame(update);
  };

  update();
}