console.log('ow, my browser');

//---------------------------------------------------------------------------
//===========================================================================
//                SETTING IMAGES
//===========================================================================
//---------------------------------------------------------------------------

//===========background image =============
var currentLevel = 0;

function loadLevel(url){
  var image = new Image();
  var level = {
    image: image,
    ready: false,
  };
  image.onload = function(){
    level.ready = true;
  };
  image.src = url;
  return level;
};

var bgs = [
	loadLevel("/images/bg00.png"),
	loadLevel("/images/bg01.png"),
	loadLevel("/images/bg02.png")
];

//---------------------------------------------------

//======building/item images===================

// var itemImages = {
//   house: "/images/house.png",
//   stairs: "/images/stairsL.png",
//   coin: "/images/coin.png",
//   gem: "/images/gem.png"
// }
//
// function loadItems(url){
//   var image = new Image();
//   var item = {
//     image: image,
//     ready: false,
//   }
//   image.onload = function(){
//     item.ready = true;
//   }
//   item.src = url;
//
// }

var houseReady = false;
var houseImage = new Image();
houseImage.onload = function () {
	houseReady = true;
};
houseImage.src = "/images/house.png";

var stairsReady = false;
var stairsImage = new Image();
stairsImage.onload = function () {
	stairsReady = true;
};
stairsImage.src = "/images/stairsL.png";

var coinReady = false;
var coinImage = new Image();
coinImage.onload = new function(){
		coinReady = true;
};
coinImage.src = "/images/coin.png"

var gemReady = false;
var gemImage = new Image();
gemImage.onload = new function(){
		gemReady = true;
};
gemImage.src = "/images/gem.png"

//======character images===================

var guyReady = false;
var guyImage = new Image();
guyImage.onload = function () {
	guyReady = true;
};
guyImage.src = "/images/guyR.png";

//======enemy images===================

var ogreReady = false;
var ogreImage = new Image();
ogreImage.onload = function () {
	ogreReady = true;
}
ogreImage.src = "/images/ogre.png";

//------------------level switcher-------------------

currentBoard = [];

var levels = [
  {x: 355, y: 365},
  {x: 12, y: 13},
  {x: 250, y: 200}
];

function levelSwitcher(){
	if (rangeDetector(guy.x,guy.y,stairs.x,stairs.y)===true){
		currentLevel++;
		}
	if (currentLevel>=levels.length){
				currentLevel = 0;
  };
  stairs.x = levels[currentLevel].x;
  stairs.y = levels[currentLevel].y;
};

//---------------------------------------------------------------------------
//===========================================================================
//                      SETTING OBJECTS
//===========================================================================
//---------------------------------------------------------------------------

//=========================characters================================

var guy = {
  speed: 250,
  health: 100,
	strength: 100,
  charisma: "haha",
  x: 20,
  y: 60,
  xp: 0,
  yp: 0,
  attack: function(){
            console.log('hyaaaa!');
            guyImage.src = "/images/guyAttackL.png";
            setTimeout(function(){guyImage.src="/images/guyR.png"}, 100);
            if((guy.x < ogre.x+30)&&(guyImage.src="/images/guyAttackL.png")){
              ogre.health = ogre.health-5
            };
          },
  update: function(modifier){

            var nextPixelUp = this.y - this.speed * modifier;
          	var nextPixelDown = this.y + this.speed * modifier;
          	var nextPixelLeft = this.x - this.speed * modifier;
          	var nextPixelRight = this.x + this.speed * modifier;

          	if (keysDown[38]===true || keysDown[87]===true) { // up
          		if(collision('up') === true){
                this.y = this.y
              } else {
                this.y = nextPixelUp;
              }
          	};

          	if (keysDown[40]===true || keysDown[83]===true) { // down
          		if(collision('down')===true){
                this.y = this.y;
              } else {
            		this.y = nextPixelDown;
          		}
          	};

          	if (keysDown[37]===true || keysDown[65]===true) { // left
          		if(collision('left')===true){
                this.x = this.x;
              } else if ((currentLevel===1) && (this.x<ogre.x+30))
              { this.x = this.x;
          		} else{
            		this.x = nextPixelLeft;
          		}
          	};

          	if (keysDown[39]===true || keysDown[68]===true){ //right
          		if(collision('right')===true){
                this.x = this.x;
              }else{
          			this.x = nextPixelRight;
          		}

          	};

            if(keysDown[32]===true){
              this.attack();
            };


        }
};

//============================enemies==============================

function Enemy(health, strength, x, y){
  this.health = health;
  this.strength = strength;
  this.x = x;
  this.y = y;
}

Enemy.prototype = {
  attack: function(){
            console.log('takethat');
          },
  danceAround: function(){
                console.log('lalala');
              },
  update: function(modifier){
            if(this.health<0){
              this.x = -100;
              this.y = -100;
            };
          }
  }

var bat = new Enemy(20,20,null,null);
var skeleton = new Enemy(30,30,null,null);
var ogre = new Enemy(50,50,50,225);
var dragon = new Enemy(150,150,null,null);

//======================items==============================

function Item(x,y){
  this.x = x;
  this.y = y;
}

var house = new Item(null,null);
var stairs = new Item(355,365);
var coin = new Item(200,375);
var gem = new Item(320, 65);
var guitar = new Item(null, null);
var tiara = new Item(null,null);

coin.update = function(){
  if(
      (currentLevel===1)
      &&
      (rangeDetector(guy.x,guy.y,this.x,this.y)===true)){
    this.y = -100;
    this.x = -100;
  }
}

gem.update = function(){
    if(
      (currentLevel===2)
      &&
      (rangeDetector(guy.x,guy.y,this.x,this.y)===true)){
        this.y = -100;
        this.x = -100;
    }

}

//========weapons===============

function Weapon(power, x, y){
  this.power = power;
  this.x = x;
  this.y = y;
}

var sword = new Weapon(10, null, null);
var axe = new Weapon(15, null, null);
var bow = new Weapon(10, null, null);


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
document.getElementById('main').appendChild(canvas);

var fogCanvas = document.createElement('canvas');
var fogCtx = fogCanvas.getContext('2d');
fogCanvas.width = 500;
fogCanvas.height = 500;
fogCanvas.setAttribute('id', 'fogCanvas');
document.getElementById('main').appendChild(fogCanvas);




//=================collision stuff==========


function rangeDetector(firstX,firstY,secondX,secondY){
  if(
    (firstX<secondX+20 && secondX-20 < firstX)
    &&
    (firstY<secondY+20 && secondY-20 <firstY)
  ){
    return true;
  } else {
    return false;
  }
}

//===================getImageData=============================

//get the background image data for the whole canvas as soon as it's set up, set values to an array.
//this way you can check the array on keydown instead of running getImageData every time the collision function runs.

//============ collision detection, take 2 =====================

collision = function(direction){
		if(direction==='right'){
			clipWidth = 2;
			clipHeight = 10;
			clipOffsetX = 30;
			clipOffsetY = 0;
		}
		if(direction==='left'){
			clipWidth = 2;
			clipHeight = 10;
			clipOffsetX = 0;
			clipOffsetY = 0;
		}
		if(direction==='up'){
			clipWidth = 10;
			clipHeight = 2;
			clipOffsetX = 0;
			clipOffsetY = 0;
		}
		if(direction==='down'){
			clipWidth = 10;
			clipHeight = 2;
			clipOffsetX = 0;
			clipOffsetY = 30;
		}

		var clipLength = clipWidth*clipHeight;
    var whatColor = ctx.getImageData(guy.x+clipOffsetX, guy.y+clipOffsetY, clipWidth, clipHeight);

      for (var i = 0; i < clipLength*4; i+=4 ) {
        console.log(whatColor.data[i]);
        if((whatColor.data[i]===255)
						&&
						(whatColor.data[i+1]===0)
						&&
						(whatColor.data[i+2]===0)
					){
          console.log('red!');
					return true;
        };
      }
}


function populateBoardWithTrueForRed(){
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var data = imageData.data;
	for(i=0; i<data.length;i+=4){
			if (data[i]>250 &&
        (data[i+1]<10 && data[i+2]<10)){
			currentBoard[i] = true;
      currentBoard[i+1] = false;
      currentBoard[i+2] = false;
      currentBoard[i+3] = "taco";
		} else {
			currentBoard[i] = false;
			currentBoard[i+1] = false;
			currentBoard[i+2] = false;
			currentBoard[i+3] = "burrito";
		}
	};
};

function isItAWall(x, y){
	var x = Math.floor(x);
	var y = Math.floor(y);
	var isItRed = currentBoard[convertCoordinatesToArrayIndex(x,y)];
  console.log('red', isItRed);
	if(isItRed===true){
		return true;
	} else {
		return false;
	};
};

//================for testing==============================

var imageDataTester = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dataTest = imageDataTester.data;

function convertCoordinatesToArrayIndex(x, y) {
	return Math.floor(x)*(canvas.width*4)+Math.floor(y)*4
};

function arrayChecker(array1, array2){
	if (array1.length ===array2.length){
		console.log('nice');
	};
	for (i = 0; i<array1.length; i++){
		if(array1[i]===255 && array2[i]!=true){
			console.log("aaaaaah!!!");
		}
	}
	console.log('dun');
};

function currentLevelArrayChecker(){
  arrayChecker(ctx.getImageData(0, 0, canvas.width, canvas.height).data, currentBoard);
}

//==============setting up keyboard============

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//---------------------------------------------------------------------------
//===========================================================================
//                       COORDINATES
//===========================================================================
//---------------------------------------------------------------------------

//==========get mouse coordinates (for debugging) ===========

function logMouseCoordinates(e){
    var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
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

var update = function (modifier) {

  guy.update(modifier);
  ogre.update(modifier);
  coin.update();
  gem.update();
  levelSwitcher();

};


//---------------------------------------------------------------------------
//===========================================================================
//                       RENDERING
//===========================================================================
//---------------------------------------------------------------------------


//================ render things =====================

var render = function () {

	if (bgs[currentLevel]) {
		ctx.drawImage(bgs[currentLevel].image, 0, 0);
	}

	if(houseReady&&currentLevel===0){
		ctx.drawImage(houseImage, 10, 10);
	}

	if (stairsReady){
		ctx.drawImage(stairsImage, stairs.x, stairs.y);
	}

	if (coinReady&&currentLevel===1){
		ctx.drawImage(coinImage, coin.x, coin.y)
	}

	if (gemReady&&currentLevel===2){
		ctx.drawImage(gemImage, gem.x, gem.y)
	}

	if (ogreReady&&currentLevel===1){
		ctx.drawImage(ogreImage, ogre.x, ogre.y)
	}

	if (guyReady) {
		ctx.drawImage(guyImage, guy.x, guy.y);
	}

  // drawFog();

};

//---------------------------------------------------------------------------
//===========================================================================
//                       MAIN GAME LOOP
//===========================================================================
//---------------------------------------------------------------------------

var main = function () {
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
