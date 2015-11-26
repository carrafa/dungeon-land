console.log('ow, my browser');

powerOn = true;

//------------------level switcher-------------------

var currentLevel = 0;

currentBoard = [];

var levels = [{
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
  if (currentLevel >= levels.length) {
    currentLevel = 0;
  };
  stairs.x = levels[currentLevel].x;
  stairs.y = levels[currentLevel].y;
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
}

//===================getImageData=============================

//get the background image data for the whole canvas as soon as it's set up, set values to an array.
//this way you can check the array on keydown instead of running getImageData every time the collision function runs.

//============ wall detection =====================

collision = function(direction) {
  if (direction === 'right') {
    clipWidth = 2;
    clipHeight = 10;
    clipOffsetX = 30;
    clipOffsetY = 0;
  }
  if (direction === 'left') {
    clipWidth = 2;
    clipHeight = 10;
    clipOffsetX = 0;
    clipOffsetY = 0;
  }
  if (direction === 'up') {
    clipWidth = 10;
    clipHeight = 2;
    clipOffsetX = 0;
    clipOffsetY = 0;
  }
  if (direction === 'down') {
    clipWidth = 10;
    clipHeight = 2;
    clipOffsetX = 0;
    clipOffsetY = 30;
  }

  var clipLength = clipWidth * clipHeight;
  var whatColor = ctx.getImageData(guy.x + clipOffsetX, guy.y + clipOffsetY,
    clipWidth, clipHeight);

  for (var i = 0; i < clipLength * 4; i += 4) {
    if ((whatColor.data[i] === 255) &&
      (whatColor.data[i + 1] === 0) &&
      (whatColor.data[i + 2] === 0)
    ) {
      console.log('red!');
      return true;
    };
  }
}


function populateBoardWithTrueForRed() {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for (i = 0; i < data.length; i += 4) {
    if (data[i] > 250 &&
      (data[i + 1] < 10 && data[i + 2] < 10)) {
      currentBoard[i] = true;
      currentBoard[i + 1] = false;
      currentBoard[i + 2] = false;
      currentBoard[i + 3] = "taco";
    } else {
      currentBoard[i] = false;
      currentBoard[i + 1] = false;
      currentBoard[i + 2] = false;
      currentBoard[i + 3] = "burrito";
    }
  };
};

function isItAWall(x, y) {
  var x = Math.floor(x);
  var y = Math.floor(y);
  var isItRed = currentBoard[convertCoordinatesToArrayIndex(x, y)];
  console.log('red', isItRed);
  if (isItRed === true) {
    return true;
  } else {
    return false;
  };
};

//================for testing==============================

var imageDataTester = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dataTest = imageDataTester.data;

function convertCoordinatesToArrayIndex(x, y) {
  return Math.floor(x) * (canvas.width * 4) + Math.floor(y) * 4
};

function arrayChecker(array1, array2) {
  if (array1.length === array2.length) {
    console.log('nice');
  };
  for (i = 0; i < array1.length; i++) {
    if (array1[i] === 255 && array2[i] != true) {
      console.log("aaaaaah!!!");
    }
  }
  console.log('dun');
};

function currentLevelArrayChecker() {
  arrayChecker(ctx.getImageData(0, 0, canvas.width, canvas.height).data,
    currentBoard);
}

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


//================ render things =====================

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
