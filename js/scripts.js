console.log('ow, my browser');

//---------------------------------------------------------------------------
//===========================================================================
//                SETTING IMAGES
//===========================================================================
//---------------------------------------------------------------------------

//===============characters================================

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
    guyImage.src = "/images/guyAttackL.png"
    setTimeout(function(){guyImage.src="/images/guyL.png"}, 100);
    if((guy.x < ogre.x+30)&&(guyImage.src="/images/guyAttackL.png")){
      ogre.health = ogre.health-5
    }

  },
};

//==========enemies==============================

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
  }
}

var bat = new Enemy(20,20,null,null)
var skeleton = new Enemy(30,30,null,null);
var ogre = new Enemy(50,50,50,225);
var dragon = new Enemy(150,150,null,null);

//---------------------------------------------------------------------------

//======================objects==============================

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

//========weapons===============

function Weapon(power, x, y){
  this.power = power;
  this.x = x;
  this.y = y;
}

var sword = new Weapon(10, null, null);
var axe = new Weapon(15, null, null);
var bow = new Weapon(10, null, null);

//-----------------------------------------------------------

//===========background image =============
var currentLevel = 0;

var bgs = [
	"/images/bg00.png",
	"/images/bg01.png",
	"/images/bg02.png"
];

var bgReady = false;
var bgImage = new Image();
  bgImage.onload = function () {
    bgReady = true;
  }
bgImage.src = bgs[currentLevel];

//---------------------------------------------------

//======building/item images===================

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

//----------------------------------------------

//======character images===================

var guyReady = false;
var guyImage = new Image();
guyImage.onload = function () {
	guyReady = true;
};
guyImage.src = "/images/guyL.png";

//----------------------------------------------


//======enemy images===================

var ogreReady = false;
var ogreImage = new Image();
ogreImage.onload = function () {
	ogreReady = true;
}
ogreImage.src = "/images/ogre.png";

//----------------------------------------------




//------------------level switcher-------------------

currentBoard = [];

var levels = [
  {x: 355, y: 365},
  {x: 12, y: 13},
  {x: 250, y: 200}
];

function levelSwitcher(){
	if (
		(guy.x < stairs.x+30 && stairs.x-30 < guy.x)
		&&
		(guy.y < stairs.y+30 && stairs.y-30 < guy.y)
	){
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

//--------------------------------------------

//=============== canvas variables =================
var c = $('#canvas');

//======== responsive canvas function =====================
// var ct = $('#canvas').get(0).getContext('2d');
// var respondWidth = $(container).width();
// var respondHeight = $(container).height();
// var container = $(c).parent();
//
// $(window).resize(function(){
//   respondCanvas();
//   render();
//   update();
//   }
// );
//
// function respondCanvas(){
//   c.attr( 'width', $(container).width() );
//   c.attr( 'height', $(container).width() );
// };
//--------------------------------------------------------------------------


//===================getImageData=============================

//get the background image data for the whole canvas as soon as it's set up, set values to an array.
//this way you can check the array on keydown instead of running getImageData every time the collision function runs.

//============ collision detection, take 2 =====================
function getImageDataExternalSource(){
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(bgImg, 0, 0 );
  var myData = context.getImageData(0, 0, 500, 500);
  var data = myData.data;
  for(i=0; i<data.length;i+=4){
      if (data[i]>245
          && data[i+1]<10
          && data[i+2]<10){
      currentBoard[i] = true;
      currentBoard[i+1] = false;
      currentBoard[i+2] = false;
      currentBoard[i+3] = 'taco';
    } else {
      currentBoard[i] = false;
      currentBoard[i+1] = false;
      currentBoard[i+2] = false;
      currentBoard[i+3] = 'burrito';
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

//---------------------------------------------------------------------------
//===========================================================================
//                SETTING UP KEYBOARD
//===========================================================================
//---------------------------------------------------------------------------


//==============keyboard listeners============

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//--------------------------------------------

//=============== movement =====================

var update = function (modifier) {

	var nextPixelUp = guy.y - guy.speed * modifier;
	var nextPixelDown = guy.y + guy.speed * modifier;
	var nextPixelLeft = guy.x - guy.speed * modifier;
	var nextPixelRight = guy.x + guy.speed * modifier;

	if (keysDown[38]===true || keysDown[87]===true) { // up
		console.log(isItAWall(guy.x, nextPixelUp));
		if(isItAWall(guy.x, nextPixelUp) === false){
      guy.y = nextPixelUp
    }
	};
	if (keysDown[40]===true || keysDown[83]===true) { // down
		console.log(isItAWall(guy.x, nextPixelDown));
		if(isItAWall(guy.x, nextPixelDown+30)===false){
  		guy.y = nextPixelDown;
		}
	}
	if (keysDown[37]===true || keysDown[65]===true) { // left
		console.log(isItAWall(nextPixelLeft, guy.y));
		if(isItAWall(nextPixelLeft, guy.y)===true){
    }else if ((currentLevel===1) && (guy.x<ogre.x+30)){
		} else{
  		guy.x = nextPixelLeft;
		}
	}
	if (keysDown[39]===true || keysDown[68]===true){ //right
		console.log(isItAWall(nextPixelRight, guy.y+30));
		if(isItAWall(nextPixelRight, guy.y)===false){
			guy.x = nextPixelRight;
		}

	};

  if(keysDown[32]===true){
    guy.attack();
  };

  if(ogre.health<0){
    ogre.x = -100;
    ogre.y = -100;
    ogreReady=false;
  }

  if((currentLevel===1)
    &&((guy.x < coin.x +20) && (guy.y < coin.y+20))){
    coin.y = -100;
    coin.x = -100;
  }

  if((currentLevel===2)&&((guy.x < gem.x +20) && (guy.y < gem.y+20))){
    gem.y = -100;
    gem.x = -100;
  }


  levelSwitcher();
};

  //============= old collision function=====================================

  // collision = function(direction){
	// 	if(direction==='right'){
	// 		clipWidth = 2;
	// 		clipHeight = 30;
	// 		clipOffsetX = 30;
	// 		clipOffsetY = 0;
	// 	}
	// 	if(direction==='left'){
	// 		clipWidth = 2;
	// 		clipHeight = 30;
	// 		clipOffsetX = 0;
	// 		clipOffsetY = 0;
	// 	}
	// 	if(direction==='up'){
	// 		clipWidth = 30;
	// 		clipHeight = 2;
	// 		clipOffsetX = 0;
	// 		clipOffsetY = 0;
	// 	}
	// 	if(direction==='down'){
	// 		clipWidth = 30;
	// 		clipHeight = 2;
	// 		clipOffsetX = 0;
	// 		clipOffsetY = 30;
	// 	}
	//
	// 	clipLength = clipWidth*clipHeight;
  //   var whatColor = ctx.getImageData(guy.x+clipOffsetX, guy.y+clipOffsetY, clipWidth, clipHeight);
	//
  //     for (var i = 0; i < clipLength*4; i+=4 ) {
  //       console.log(whatColor.data[i]);
  //       if((whatColor.data[i]===255)
	// 					&&
	// 					(whatColor.data[i+1]===0)
	// 					&&
	// 					(whatColor.data[i+2]===0)
	// 				){
  //         console.log('red!');
	// 				return true;
  //       };
        // if(whatColor.data[i+1]===255){  <----------green
        // };
        // if(whatColor.data[i+2]===255){  <----------blue
        // }
  //     };
	//
  // };

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
//===========================================================================
//                       COORDINATES
//===========================================================================
//---------------------------------------------------------------------------

// getPCoords = function(object){
//
//   var xWidth = $('#canvas').width();
//   var yheight = $('#canvas').height();
//
//
//   percentageCOordsX = (object.x/500);
//   percentageCoordsY = (object.y/500);
//
//   percentageCOordsX*xWidth
//
// }

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

//-----------------------------------------------------------

//---------------------------------------------------------------------------
//===========================================================================
//                       Fog of War
//===========================================================================
//---------------------------------------------------------------------------



//---------------------------------------------------------------------------


//---------------------------------------------------------------------------
//===========================================================================
//                       RENDERING
//===========================================================================
//---------------------------------------------------------------------------


//================ render things =====================

var render = function () {

	if (bgReady) {
		bgImage.src = bgs[currentLevel];
    bgImage.width = c.width;
    bgImage.height = c.height();
		ctx.drawImage(bgImage, 0, 0);
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

	//fog() goes here

};

//------------------------------------------------

//================ main game loop ==============

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
