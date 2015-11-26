console.log('ow, my browser');

powerOn = true;

//---------------------------------------------------------------------------
//===========================================================================
//                          LEVEL SWITCHER
//===========================================================================
//---------------------------------------------------------------------------

var currentLevel = 0;

currentBoard = [];

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
  x: 250,
  y: 200
}];

function levelSwitcher() {
  if (rangeDetector(guy.x, guy.y, stairs.x, stairs.y, 10) === true) {
    currentLevel++;
  }
  if (currentLevel >= stairLocation.length) {
    currentLevel = 0;
  };
  stairs.x = stairLocation[currentLevel].x;
  stairs.y = stairLocation[currentLevel].y;
};

//---------------------------------------------------------------------------
//===========================================================================
//                          GLOBAL VARIABLES
//===========================================================================
//---------------------------------------------------------------------------

// global counter for animating

var n = 0;

function updateN() {
  n++;
  if (n > 100) {
    n = 0;
  };
};

//---------------------------------------------------------------------------
//===========================================================================
//                SETTING UP CANVAS
//===========================================================================
//---------------------------------------------------------------------------

//============== create canvas ===============
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.setAttribute('id', 'canvas');
document.getElementById('canvas-container').appendChild(canvas);

var fogCanvas = document.createElement('canvas');
var fogCtx = fogCanvas.getContext('2d');
fogCanvas.width = 500;
fogCanvas.height = 500;
fogCanvas.setAttribute('id', 'fogCanvas');
document.getElementById('canvas-container').appendChild(fogCanvas);

//---------------------------------------------------------------------------
//===========================================================================
//                      COLLISION
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

//===================getImageData=============================

//get the background image data for the whole canvas as soon as it's set up, set values to an array.
//this way you can check the array on keydown instead of running getImageData every time the collision function runs.

//============ wall detection =====================


collision = function(x, y, w, h) {
  var whatColor = ctx.getImageData(x, y, w, h);
  for (var i = 0; i < w * h * 4; i += 4) {
    if ((whatColor.data[i] === 255) &&
      (whatColor.data[i + 1] === 0) &&
      (whatColor.data[i + 2] === 0)
    ) {
      console.log('red!');
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

//---------------------------------------------------------------------------
//===========================================================================
//                       COORDINATES
//===========================================================================
//---------------------------------------------------------------------------

//==========get mouse coordinates (for testing) ===========

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

  guy.update(modifier);
  bat.update(modifier);
  ogre.update(modifier);
  coin.update();
  gem.update();
  sword.update();
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

  if (currentLevel === 0) {
    ctx.drawImage(houseImage, 10, 10);
  }

  if (stairsReady) {
    ctx.drawImage(stairsImage, stairs.x, stairs.y);
  }

  if (coinReady && currentLevel === 1) {
    ctx.drawImage(coinImage, coin.x, coin.y)
  }

  if (gemReady && currentLevel === 2) {
    ctx.drawImage(gemImage, gem.x, gem.y)
  }

  if (swordReady && currentLevel === 1) {
    ctx.drawImage(swordImage, sword.x, sword.y)
  }

  if (ogreReady && currentLevel === 1) {
    ctx.drawImage(ogreImage, ogre.x, ogre.y)
  }

  if (batReady && currentLevel === 2) {
    ctx.drawImage(batImage, bat.x, bat.y);
  }

  if (guyReady) {
    ctx.drawImage(guyImage, guy.x + guy.offsetX, guy.y + guy.offsetY);
  }

  // drawFog();

  if (deadReady === true && guy.health < 0) {
    ctx.drawImage(deadImage, 0, 0);
    setTimeout(showControls, 2000);
  };


  if (powerOn === false) {
    ctx.fillRect(10, 10, 480, 480);
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



var then = Date.now();
main();
