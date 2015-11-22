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
guyImage.src = "/games/images/guy.png";



//----------------------------------------------


//===========background image =============

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "/games/images/bg.png";

//-----------------------------------------




//===============characters------------------

var guy = {
  speed: 300,
  charisma: 0,
  dexterity: 0,
  blabla: 0,
  x: 5,
  y: 5,
  xp: 0,
  yp: 0,
};

var rocket = {
  speed: 300,
}

//---------------------------------------------------------------------------

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




  //=============collision=====================================

  collision = function(direction){
		if(direction==='right'){
			clipWidth = 2;
			clipDepth = 10;
			clipOffsetX = 40;
			clipOffsetY = 20;
		}
		if(direction==='left'){
			clipWidth = 2;
			clipDepth = 10;
			clipOffsetX = 0;
			clipOffsetY = 20;
		}
		if(direction==='up'){
			clipWidth = 10;
			clipDepth = 2;
			clipOffsetX = 20;
			clipOffsetY = 0;
		}
		if(direction==='down'){
			clipWidth = 10;
			clipDepth = 4;
			clipOffsetX = 20;
			clipOffsetY = 40;
		}
		clipLength = clipWidth*clipDepth;
    var whatColor = ctx.getImageData(guy.x+clipOffsetX, guy.y+clipOffsetY, clipWidth, clipDepth);

      for (var i = 0; i < clipLength*4; i+=4 ) {
        console.log(whatColor.data[i]);
        if(whatColor.data[i]>250){
          console.log('red!');
					return true;
        };
        if(whatColor.data[i+1]>200){
          console.log('green!');
					return false;
        };
        if(whatColor.data[i+2]>200){
          console.log('blue!');
          return false;
        }
      };

  };

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

	if (bgReady) {
    bgImage.width = c.width;
    bgImage.height = c.height();
		ctx.drawImage(bgImage, 0, 0);
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
