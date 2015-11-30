console.log('ow, my browser');

//---------------------------------------------------------------------------
//===========================================================================
//                          LEVEL SWITCHER
//===========================================================================
//---------------------------------------------------------------------------

var currentLevel = 0;

var stairLocation = [{
  x: 355,
  y: 365
}, {
  x: 12,
  y: 13
}, {
  x: 250,
  y: 200
}, {
  x: 12,
  y: 13
}, {
  x: 450,
  y: 450
}, {
  x: 75,
  y: 30
}, {
  x: 445,
  y: 30
}, {
  x: -100,
  y: -100
}];

function levelSwitcher() {
  if (rangeDetector(guy.x, guy.y, stairs.x, stairs.y, 10) === true) {
    currentLevel++;
  }
  if (currentLevel >= stairLocation.length) {
    currentLevel = 7;
  };
  stairs.x = stairLocation[currentLevel].x;
  stairs.y = stairLocation[currentLevel].y;
};

//====for testing =====

$('#level').on('click', function() {
  currentLevel++;
})

//---------------------------------------------------------------------------
//===========================================================================
//                          GLOBAL VARIABLES
//===========================================================================
//---------------------------------------------------------------------------

// === global counter for animating ===

var n = 0;

function updateN() {
  n++;
  if (n > 100) {
    n = 0;
  };
};

// ==== for timing and animating stuff ====

timingIntervals = {
  twice: function() {
    if (n > 50)
      return true;
  },
  thrice: function() {
    if (n > 66) {
      return true;
    }
  },
  fourTimes: function() {
    if (
      (n < 25) ||
      (n > 50 && n < 75)
    )
      return true;
  },
  fiveTimes: function() {
    if (
      (n < 10) ||
      (n > 50 && n < 70) ||
      (n > 90)
    )
      return true;
  },
  percentage: function(num) {
    if (n < num) {
      return true;
    }
  },
};

//---------------------------------------------------------------------------
//===========================================================================
//                         SETTING UP CANVAS
//===========================================================================
//---------------------------------------------------------------------------

//========================= create canvas ===================================
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.setAttribute('id', 'canvas');
document.getElementById('canvas-container').appendChild(canvas);


//---------------------------------------------------------------------------
//===========================================================================
//                           COLLISION
//===========================================================================
//---------------------------------------------------------------------------

//=============object detection===================

function rangeDetector(firstX, firstY, secondX, secondY, distance) {
  if (distance === undefined) {
    distance = 20
  };
  if (
    (firstX < secondX + distance && secondX - distance < firstX) &&
    (firstY < secondY + distance && secondY - distance < firstY)
  ) {
    return true;
  } else {
    return false;
  }
};

//============ wall detection =====================

collision = function(x, y, w, h) {
  var whatColor = ctx.getImageData(x, y, w, h);
  for (var i = 0; i < w * h * 4; i += 4) {
    if ((whatColor.data[i] === 255) &&
      (whatColor.data[i + 1] === 0) &&
      (whatColor.data[i + 2] === 0)
    ) {
      console.log('wall!');
      return true;
    }
  }
};

//==============setting up keyboard============

var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

function clickControlsDown(num) {
  keysDown[num] = true;
};

function clickControlsUp(num) {
  keysDown[num] = false;
};

//==============setting up mouse controls======================
$('#up').mousedown(function() {
  clickControlsDown(87);
});
$('#up').mouseup(function() {
  clickControlsUp(87);
});
$('#down').mousedown(function() {
  clickControlsDown(83);
});
$('#down').mouseup(function() {
  clickControlsUp(83);
});
$('#left').mousedown(function() {
  clickControlsDown(65);
});
$('#left').mouseup(function() {
  clickControlsUp(65);
});
$('#right').mousedown(function() {
  clickControlsDown(68);
});
$('#right').mouseup(function() {
  clickControlsUp(68);
});
$('#spacebar').mousedown(function() {
  clickControlsDown(32);
});
$('#spacebar').mouseup(function() {
  clickControlsUp(32);
});

//---------------------------------------------------------------------------
//===========================================================================
//                       COORDINATES
//===========================================================================
//---------------------------------------------------------------------------

//==========log mouse coordinates (for testing/level design) ===========

function logMouseCoordinates(e) {
  var mouseX, mouseY;

  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
  console.log("x:" + mouseX);
  console.log("y:" + mouseY);
}

$('#canvas').on('click', logMouseCoordinates);

//---------------------------------------------------------------------------
//===========================================================================
//                       Fog of War
//===========================================================================
//---------------------------------------------------------------------------

//???????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????

//---------------------------------------------------------------------------
//===========================================================================
//                UPDATE
//===========================================================================
//---------------------------------------------------------------------------

var update = function(modifier) {

  updateAllFlames(modifier);
  guy.update(modifier);
  updateEnemies(modifier);
  updateItems(modifier);
  updateWeapons(modifier);
  levelSwitcher();
  updateN();
  updateMenu();

};

//---------------------------------------------------------------------------
//===========================================================================
//                       RENDERING
//===========================================================================
//---------------------------------------------------------------------------

var render = function() {

  if (bgs[currentLevel]) {
    ctx.drawImage(bgs[currentLevel].image, 0, 0);
  }


  if (stairsReady) {
    ctx.drawImage(stairsImage, stairs.x, stairs.y);
  }

  drawObstacles();
  drawItems();
  drawWeapons();
  drawEnemies();

  if (guyReady) {
    ctx.drawImage(guyImage, guy.x + guy.offsetX, guy.y + guy.offsetY);
  }

  // drawFog();

  if (deadReady === true && guy.health < 0) {
    theme.pause();
    theme.currentTime = 0;
    guyDeadTheme.play();
    ctx.drawImage(deadImage, 0, 0);
  };

  if (currentLevel === 7) {
    ctx.drawImage(theEndImage, 0, 0, 500, 500);
    theme.pause();
    theme.currentTime = 0;
    theEnd.play();
    guy.becomeDragon();
    ctx.drawImage(guyImage, guy.x + guy.offsetX, guy.y + guy.offsetY);

  }

};

//---------------------------------------------------------------------------
//===========================================================================
//                       MAIN GAME LOOP
//===========================================================================
//---------------------------------------------------------------------------

var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
};

//------------------------------------------------

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

$(function() {
  theme.play();
});

var then = Date.now();
main();
