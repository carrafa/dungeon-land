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

function FlameCreator(level, r, x, y) {
  this.level = level;
  this.r = r;
  this.x = x;
  this.y = y;
  this.image = ["/images/traps/flame01.png",
    "/images/traps/flame02.png",
    "/images/traps/flame03.png",
    "/images/traps/flame02.png",
    "", "", "", "", "", "", ""
  ];
  this.killer = false;
}

FlameCreator.prototype = {
  update: function() {
    flameImage.src = this.image[Math.floor(n / this.r)];
    if ((Math.floor(n / this.r) < 4)) {
      if (this.level === currentLevel) {
        this.killer = true;
      }
    } else {
      this.killer = false;
    }
    if (
      rangeDetector(guy.x, guy.y, this.x, this.y, 20) === true &&
      this.killer === true
    ) {
      guy.health -= 50;
    }
  }
};

//level 1 flames
var flame01 = new FlameCreator(1, 10, 300, 135);

//level 2 flames
var flame02 = new FlameCreator(2, 10, 150, 465)

//level 3 flames
var flame03 = new FlameCreator(3, 10, 390, 350)
var flame04 = new FlameCreator(3, 10, 325, 350)
var flame05 = new FlameCreator(3, 10, 260, 350)
var flame06 = new FlameCreator(3, 10, 200, 350)
var flame07 = new FlameCreator(3, 10, 130, 350)
var flame08 = new FlameCreator(3, 10, 225, 95)
var flame09 = new FlameCreator(3, 10, 225, 475)

updateAllFlames = function() {
  flame01.update();
  flame02.update();
  flame03.update();
  flame04.update();
  flame05.update();
  flame06.update();
  flame07.update();
  flame08.update();
  flame09.update();
}


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
  }
};


function drawObstacles() {
  flashyWalls();
  drawFlames(250, 250);
  drawFlames(100, 100);
}
