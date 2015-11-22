console.log('ow, my browser');

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

//======== responsive canvas function ========
var c = $('#canvas');
var ct = $('#canvas').get(0).getContext('2d');
var container = $(c).parent();
var respondWidth = $(container).width();
var respondHeight = $(container).height();
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



//---------------------------------------------------------------------------
//===========================================================================
//                SETTING IMAGES
//===========================================================================
//---------------------------------------------------------------------------

//======character images===================

var guyReady = false;
var guyImage = new Image();
guyImage.onload = function () {
	guyReady = true;
};
guyImage.src = "/images/guy.png";



//----------------------------------------------


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
stairsImage.src = "/images/stairs.png";

//----------------------------------------------


//===========background image =============

var bgs = [
	"/images/bg0.png",
	"/images/bg1.png",
];

var currentLevel = 0;


var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = bgs[currentLevel];




//---------------------------------------------------




//===============characters================================

var guy = {
  speed: 200,
  health: 100,
	strength: 100,
  charisma: 0,
  x: 20,
  y: 60,
  xp: 0,
  yp: 0,
};

var ogre = {
	health: 20,
	strength: 20,
}

var dragon = {
  health: 100,
	strength: 100,
}

//---------------------------------------------------------------------------

//======================objects==============================

var house = {
	speed: 0,
	x: null,
	y: null,
}

var stairsDown = {
	speed: 0,
	x: null,
	y: null,
}

var stairs = {
	speed: 0,
	x: null,
	y: null,
}
//-----------------------------------------------------------





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

	if (keysDown[38]===true || keysDown[87]===true) { // up
		if(collision('up')===true){
			guy.y = guy.y;
		} else {
		guy.y -= guy.speed * modifier;
    }
	}
	if (keysDown[40]===true || keysDown[83]===true) { // down
		if(collision('down')===true){
			guy.y = guy.y;
		} else {
		guy.y += guy.speed * modifier;
		}
	}
	if (keysDown[37]===true || keysDown[65]===true) { // left
		if(collision('left')===true){
			guy.x = guy.x;
		} else{
		guy.x -= guy.speed * modifier;
		}
	}
	if (keysDown[39]===true || keysDown[68]===true){ //right
		if(collision('right')===true){
			guy.x = guy.x;
		} else {
			guy.x += guy.speed * modifier;
		}
	};

};

//==========get mouse coordinates (for debugging) ===========

function mousePos(e)
{
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

    /* do something with mouseX/mouseY */
}

$('#canvas').on('click', mousePos);

//-----------------------------------------------------------


  //=============collision=====================================

  collision = function(direction){
		if(direction==='right'){
			clipWidth = 5;
			clipHeight = 20;
			clipOffsetX = 36;
			clipOffsetY = 12;
		}
		if(direction==='left'){
			clipWidth = 5;
			clipHeight = 10;
			clipOffsetX = 0;
			clipOffsetY = 20;
		}
		if(direction==='up'){
			clipWidth = 10;
			clipHeight = 5;
			clipOffsetX = 0;
			clipOffsetY = 0;
		}
		if(direction==='down'){
			clipWidth = 20;
			clipHeight = 5;
			clipOffsetX = 6;
			clipOffsetY = 42;
		}

		clipLength = clipWidth*clipHeight;
    var whatColor = ctx.getImageData(guy.x+clipOffsetX, guy.y+clipOffsetY, clipWidth, clipHeight);

      for (var i = 0; i < clipLength*4; i+=4 ) {
        console.log(whatColor.data[i]);
        if(whatColor.data[i]>250){
          console.log('red!');
					return true;
        };
        // if(whatColor.data[i+1]>200){   \
        //   console.log('green!')         |
        // };                              |  looks for green and blue.
        // if(whatColor.data[i+2]>200){    |  maybe do something with it later.
        //   console.log('blue!');         |
        // }                              /
      };

  };

//---------------------------------------------------------------------------
//===========================================================================
//                       LEVEL SWITCHER
//===========================================================================
//---------------------------------------------------------------------------

//





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







//---------------------------------------------------------------------------
//===========================================================================
//                       RENDERING
//===========================================================================
//---------------------------------------------------------------------------


//================ render things =====================

var render = function () {

	switch(currentLevel){
		case 0:
			if (
				(guy.x > stairs.x-30 && guy.x < stairs.x)
				&&
				(guy.y > stairs.y-30 && guy.y < stairs.y+20)
			){
				currentLevel = 1;
			}
			break;
	};


	if (bgReady) {
		bgImage.src = bgs[currentLevel];
    bgImage.width = c.width;
    bgImage.height = c.height();
		ctx.drawImage(bgImage, 0, 0);
	}

	if(houseReady&&(currentLevel===0)){
		ctx.drawImage(houseImage, 10, 10);
	}

	if(stairsReady){
		switch(currentLevel){
			case 0:
				stairs.x = 447;
				stairs.y = 438;
				ctx.drawImage(stairsImage, stairs.x, stairs.y);
				break;
			case 1:
			stairs.x = 447;
			stairs.y = 438;
				ctx.drawImage(stairsImage, 447, 438);
				break;
		};
	}


	if (guyReady) {
		ctx.drawImage(guyImage, guy.x, guy.y);
	}



};

//------------------------------------------------

//================ main game loop ==============

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

//==================== alt game loop================
// var FPS = 30;
// setInterval(function() {
//   update();
//   render();
// }, 1000/FPS);
//------------------------------------------------------

//------------------------------------------------

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;



var then = Date.now();
main();

//==================== on load =======================
// $(document).ready(function(){
  // respondCanvas();
  // main();
// });

//--------------------------------------------------
