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

function FlameCreator(level, r, modifier, x, y) {
  this.level = level;
  this.r = r;
  this.modifier = modifier;
  this.x = x;
  this.y = y;
  this.killer = false;
  this.image = ["/images/traps/flame01.png",
    "/images/traps/flame02.png",
    "/images/traps/flame03.png",
    "/images/traps/flame02.png",
    "", "", "", "", "", "", ""
  ];
}

FlameCreator.prototype = {
  update: function() {
    flameImage.src = this.image[Math.floor((n / this.r) + this.modifier)];
    if (
      (Math.floor((n / this.r) + this.modifier) < 4) &&
      (this.level === currentLevel)
    ) {
      this.killer = true;
    } else {
      this.killer = false;
    }
    if (
      rangeDetector(guy.x, guy.y, this.x, this.y, 10) === true &&
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
var flame01 = new FlameCreator(1, 10, 0, 300, 135);

//level 2 flames
var flame02 = new FlameCreator(2, 10, 0, 150, 465)

//level 3 flames
var flame04 = new FlameCreator(3, 10, 0, 325, 350)
var flame03 = new FlameCreator(3, 10, 0, 390, 350)
var flame05 = new FlameCreator(3, 10, 0, 260, 350)
var flame06 = new FlameCreator(3, 10, 0, 200, 350)
var flame07 = new FlameCreator(3, 10, 0, 130, 350)
var flame08 = new FlameCreator(3, 10, 0, 225, 95)
var flame09 = new FlameCreator(3, 10, 0, 225, 475)

//level 5 flames
var flame10 = new FlameCreator(5, 10, 0, 245, 343)
var flame11 = new FlameCreator(5, 101, 2, 245, 323)
var flame12 = new FlameCreator(5, 101, 2, 245, 303)
var flame13 = new FlameCreator(5, 101, 2, 245, 283)

var flame14 = new FlameCreator(5, 101, 2, 177, 343)
var flame15 = new FlameCreator(5, 101, 2, 177, 323)
var flame16 = new FlameCreator(5, 101, 2, 177, 303)
var flame17 = new FlameCreator(5, 101, 2, 177, 283)

var flame18 = new FlameCreator(5, 101, 2, 427, 8)
var flame19 = new FlameCreator(5, 101, 2, 427, 23)
var flame20 = new FlameCreator(5, 101, 2, 427, 38)

var flame21 = new FlameCreator(5, 101, 2, 439, 55)
var flame22 = new FlameCreator(5, 101, 2, 453, 55)
var flame23 = new FlameCreator(5, 101, 2, 466, 55)
var flame24 = new FlameCreator(5, 101, 2, 480, 55)

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
  if ((currentLevel === 5)) {
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
    }
  }
};


function drawObstacles() {
  flashyWalls();
  drawFlames();
}
