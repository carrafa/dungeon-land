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
}



//=======================flames===========================

function FlameCreator(x, y) {
  this.x = x;
  this.y = y;
  this.image = ["/images/traps/flame01.png",
    "/images/traps/flame02.png",
    "/images/traps/flame03.png",
    "/images/traps/flame02.png",
  ]

}

FlameCreator.prototype = {
  update: function() {
    flameImage.src = this.image[Math.floor(n / 26)];
    if (rangeDetector(guy.x, guy.y, this.x, this.y, 20) === true) {
      guy.health -= 50;
    }
  }
};

var flame01 = new FlameCreator(300, 135);

updateAllFlames = function() {
  flame01.update();
}


function drawFlames() {
  if (flameReady) {
    if (currentLevel === 1) {
      ctx.drawImage(flameImage, flame01.x, flame01.y);
    }
  }
};


function drawAllObstacles() {
  flashyWalls();
  drawFlames(250, 250);
  drawFlames(100, 100);
}
