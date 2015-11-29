//=======================walls=============================

function createWall(x, y, w, h, intervalFunction, num) {
  if (intervalFunction(num)) {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w, h);
  }
};

function flashyWalls() {
  if (currentLevel === 1) {
    createWall(350, 270, 100, 5, timingIntervals.percentage, 50);
    createWall(100, 270, 100, 5, timingIntervals.percentage, 95);
    createWall(205, 215, 100, 5, timingIntervals.percentage, 30);
    createWall(60, 110, 100, 5, timingIntervals.percentage, 90);
    createWall(445, 115, 5, 40, timingIntervals.percentage, 90);
  };
  if (currentLevel === 2) {
    createWall(120, 60, 100, 5, timingIntervals.fiveTimes)
    createWall(180, 180, 60, 5, timingIntervals.fourTimes)
    createWall(310, 380, 60, 5, timingIntervals.fourTimes)
    createWall(370, 65, 5, 60, timingIntervals.percentage, 90)
  }
  if (currentLevel === 3) {
    createWall(430, 375, 5, 70, timingIntervals.percentage, 50);
    createWall(365, 275, 5, 70, timingIntervals.percentage, 50);
    createWall(300, 375, 5, 70, timingIntervals.percentage, 50);
    createWall(230, 275, 5, 70, timingIntervals.percentage, 50);
    createWall(170, 375, 5, 70, timingIntervals.percentage, 50);
    createWall(105, 275, 5, 70, timingIntervals.percentage, 50);
    createWall(160, 60, 100, 5, timingIntervals.percentage, 90);
  }
}



//=======================flames===========================

function FlameCreator(level, rate, modifier, range, x, y) {
  this.level = level;
  this.rate = rate;
  this.modifier = modifier;
  this.range = range;
  this.x = x;
  this.y = y;
  this.killer = false;
  this.image = ["images/traps/flame01.png",
    "images/traps/flame02.png",
    "images/traps/flame03.png",
    "images/traps/flame02.png",
    "", "", "", "", "", "", ""
  ];
}

FlameCreator.prototype = {
  update: function() {
    flameImage.src = this.image[Math.floor((n / this.rate) + this.modifier)];
    if (
      (Math.floor((n / this.rate) + this.modifier) < 4) &&
      (this.level === currentLevel)
    ) {
      this.killer = true;
    } else {
      this.killer = false;
    }
    if (
      rangeDetector(guy.x, guy.y, this.x, this.y, this.range) === true &&
      this.killer === true
    ) {
      guy.health -= 50;
    }
    if (currentLevel === 5 && skeleton.health < 0) {
      this.x = -100;
      this.y = -100;
    }
  }
};

//level 1 flames
var flame01 = new FlameCreator(1, 10, 0, 20, 300, 135);

//level 2 flames
var flame02 = new FlameCreator(2, 10, 0, 20, 150, 465)

//level 3 flames
var flame04 = new FlameCreator(3, 10, 0, 20, 325, 350)
var flame03 = new FlameCreator(3, 10, 0, 20, 390, 350)
var flame05 = new FlameCreator(3, 10, 0, 20, 260, 350)
var flame06 = new FlameCreator(3, 10, 0, 20, 200, 350)
var flame07 = new FlameCreator(3, 10, 0, 20, 130, 350)
var flame08 = new FlameCreator(3, 10, 0, 20, 225, 95)
var flame09 = new FlameCreator(3, 10, 0, 20, 225, 475)

//level 5 flames
var flame10 = new FlameCreator(5, 10, 2, 10, 245, 343)
var flame11 = new FlameCreator(5, 101, 2, 10, 245, 323)
var flame12 = new FlameCreator(5, 101, 2, 10, 245, 303)
var flame13 = new FlameCreator(5, 101, 2, 10, 245, 283)

var flame14 = new FlameCreator(5, 101, 2, 10, 177, 343)
var flame15 = new FlameCreator(5, 101, 2, 10, 177, 323)
var flame16 = new FlameCreator(5, 101, 2, 10, 177, 303)
var flame17 = new FlameCreator(5, 101, 2, 10, 177, 283)

var flame18 = new FlameCreator(5, 101, 2, 10, 190, 55)
var flame19 = new FlameCreator(5, 101, 2, 10, 205, 55)
var flame20 = new FlameCreator(5, 101, 2, 10, 220, 55)
var flame21 = new FlameCreator(5, 101, 2, 10, 235, 55)

var flame22 = new FlameCreator(5, 101, 2, 10, 439, 55)
var flame23 = new FlameCreator(5, 101, 2, 10, 453, 55)
var flame24 = new FlameCreator(5, 101, 2, 10, 466, 55)
var flame25 = new FlameCreator(5, 101, 2, 10, 480, 55)

//level 6 flames
var flame26 = new FlameCreator(6, 10, 0, 20, 70, 90)
var flame27 = new FlameCreator(6, 10, 0, 20, 100, 90)
var flame28 = new FlameCreator(6, 10, 0, 20, 70, 180)
var flame29 = new FlameCreator(6, 10, 0, 20, 100, 180)
var flame30 = new FlameCreator(6, 10, 0, 20, 70, 270)
var flame31 = new FlameCreator(6, 10, 0, 20, 100, 270)
var flame32 = new FlameCreator(6, 10, 0, 20, 260, 280)
var flame33 = new FlameCreator(6, 10, 0, 20, 290, 280)

updateAllFlames = function() {
  if (currentLevel === 1) {
    flame01.update();
  }
  if (currentLevel === 2) {
    flame02.update();
  }
  if (currentLevel === 3) {
    flame03.update();
    flame04.update();
    flame05.update();
    flame06.update();
    flame07.update();
    flame08.update();
    flame09.update();
  }
  if (currentLevel === 5) {
    flame10.update();
    flame11.update();
    flame12.update();
    flame13.update();
    flame14.update();
    flame15.update();
    flame16.update();
    flame17.update();
    flame18.update();
    flame19.update();
    flame20.update();
    flame21.update();
    flame22.update();
    flame23.update();
    flame24.update();
    flame25.update();
  }

  if ((currentLevel === 6) || (currentLevel === 4)) {
    flame26.update();
    flame27.update();
    flame28.update();
    flame29.update();
    flame30.update();
    flame31.update();
    flame32.update();
    flame33.update();
  }
};


function drawFlames() {
  if (flameReady) {
    if (currentLevel === 1) {
      ctx.drawImage(flameImage, flame01.x, flame01.y);
    }
    if (currentLevel === 2) {
      ctx.drawImage(flameImage, flame02.x, flame02.y);
    }
    if (currentLevel === 3) {
      ctx.drawImage(flameImage, flame03.x, flame03.y);
      ctx.drawImage(flameImage, flame04.x, flame04.y);
      ctx.drawImage(flameImage, flame05.x, flame05.y);
      ctx.drawImage(flameImage, flame06.x, flame06.y);
      ctx.drawImage(flameImage, flame07.x, flame07.y);
      ctx.drawImage(flameImage, flame08.x, flame08.y);
      ctx.drawImage(flameImage, flame09.x, flame09.y);
    }
    if (currentLevel === 5) {
      ctx.drawImage(flameImage, flame10.x, flame10.y);
      ctx.drawImage(flameImage, flame11.x, flame11.y);
      ctx.drawImage(flameImage, flame12.x, flame12.y);
      ctx.drawImage(flameImage, flame13.x, flame13.y);
      ctx.drawImage(flameImage, flame14.x, flame14.y);
      ctx.drawImage(flameImage, flame15.x, flame15.y);
      ctx.drawImage(flameImage, flame16.x, flame16.y);
      ctx.drawImage(flameImage, flame17.x, flame17.y);
      ctx.drawImage(flameImage, flame18.x, flame18.y);
      ctx.drawImage(flameImage, flame19.x, flame19.y);
      ctx.drawImage(flameImage, flame20.x, flame20.y);
      ctx.drawImage(flameImage, flame21.x, flame21.y);
      ctx.drawImage(flameImage, flame22.x, flame22.y);
      ctx.drawImage(flameImage, flame23.x, flame23.y);
      ctx.drawImage(flameImage, flame24.x, flame24.y);
      ctx.drawImage(flameImage, flame25.x, flame25.y);
    }
    if ((currentLevel === 6) || (currentLevel === 4)) {
      ctx.drawImage(flameImage, flame26.x, flame26.y);
      ctx.drawImage(flameImage, flame27.x, flame27.y);
      ctx.drawImage(flameImage, flame28.x, flame28.y);
      ctx.drawImage(flameImage, flame29.x, flame29.y);
      ctx.drawImage(flameImage, flame30.x, flame30.y);
      ctx.drawImage(flameImage, flame31.x, flame31.y);
      ctx.drawImage(flameImage, flame32.x, flame32.y);
      ctx.drawImage(flameImage, flame33.x, flame33.y);
    }
  }
};


function drawObstacles() {
  flashyWalls();
  drawFlames();
}
