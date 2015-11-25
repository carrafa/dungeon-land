console.log('ow, my browser');

powerOn = false;

//------------------level switcher-------------------

var currentLevel = 0;

currentBoard = [];

var levels = [
  {x: 355, y: 365},
  {x: 12, y: 13},
  {x: 250, y: 200}
];

function levelSwitcher(){
	if (rangeDetector(guy.x,guy.y,stairs.x,stairs.y, 10)===true){
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
  power: 1,
  charisma: "haha",
  weapon: "unarmed",
  imageL: "/images/guyL.png",
  imageR: "/images/guyR.png",
  imageLAttack: "/images/guyAttackL.png",
  imageRAttack: "/images/guyAttackR.png",
  x: 20,
  y: 60,
  offsetX: 0,
  offsetY: 0,
  xp: 0,
  yp: 0,
  equipSword: function(){
                guy.weapon = "sword";
                if(guy.weapon==="sword"){
                  guy.imageL = "/images/guySwordL.png";
                  guy.imageR = "/images/guySwordR.png";
                  guy.imageLAttack = "/images/guySwordAttackL.png";
                  guy.imageRAttack = "/images/guySwordAttackR.png";
                }
                guy.power = 5;
              },
  becomeWizard: function(){
                guy.weapon = "wizard";
                if(guy.weapon==="wizard"){
                  guy.imageL = "/images/guyWizardL.png";
                  guy.imageR = "/images/guyWizardR.png";
                  guy.imageLAttack = "/images/guyWizardAttackL.png";
                  guy.imageRAttack = "/images/guyWizardAttackR.png";
                }
                guy.power = 100;
              },
  attack: function(){
            console.log('hyaaaa!');
            if (guyImage.src==="http://localhost:8080" + guy.imageL){
              guyImage.src = guy.imageLAttack;
                guy.offsetX = -30;
                guy.offsetY = -10;
              setTimeout(function(){
                guyImage.src=guy.imageL;
                guy.offsetX = 0;
                guy.offsetY = 0;
                }, 100);
            }else if (guyImage.src ==="http://localhost:8080" + guy.imageR){
              guyImage.src = guy.imageRAttack;
              this.offsetY = -10;
              setTimeout(function(){
                guyImage.src=guy.imageR;
                guy.offsetY = 0;
                }, 100);
            };
            if( (rangeDetector(guy.x,guy.y,ogre.x,ogre.y, 30)===true)&&(guyImage.src==="http://localhost:8080" + guy.imageLAttack)){
              ogre.health = ogre.health-guy.power;
            };
            if( (rangeDetector(guy.x,guy.y,bat.x,bat.y, 40)===true)&&(guyImage.src==="http://localhost:8080" + guy.imageLAttack)){
              bat.health = bat.health-guy.power;
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
              guyImage.src = guy.imageL;
              guy.offsetX = 0;
              guy.offsetY = 0;
          		if(collision('left')===true){
                this.x = this.x;
              } else if ((currentLevel===1) && (this.x<ogre.x+30))
              { this.x = this.x;
          		} else{
            		this.x = nextPixelLeft;
          		}
          	};

          	if (keysDown[39]===true || keysDown[68]===true){ //right
              guyImage.src = guy.imageR;
              guy.offsetX = 0;
              guy.offsetY = 0;
          		if(collision('right')===true){
                this.x = this.x;
              }else{
          			this.x = nextPixelRight;
          		}

          	};

            if(keysDown[32]===true||keysDown[67]===true){
              this.attack();
            };

            if(keysDown[77]===true){
              this.becomeWizard();
            };
            if(keysDown[78]===true){
              this.equipSword();
            }


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
                this.health ++;
              },
  update: function(modifier){
            if(this.health<0){
              this.x = -100;
              this.y = -100;
            };
          }
  }

var ogre = new Enemy(50,50,50,225);
var bat = new Enemy(100,100,250,400);
var skeleton = new Enemy(150,150,null,null);
var dragon = new Enemy(500,500,null,null);

// global counter
var n  = 0;
function updateN(){
  n++;
  if(n>50){
    n = 0;
  };
};

ogre.update = function(modifier){
  if(this.health<0){
    this.x = -100;
    this.y = -100;
  };
  if((n>10&&n<25)||(n>45)){
    ogreImage.src = "/images/ogreAttack.png";
  } else {
    ogreImage.src = "/images/ogre.png";
  };
  if(
    (rangeDetector(guy.x,guy.y,ogre.x,ogre.y,30)===true)
    &&
    (ogreImage.src==="http://localhost:8080/images/ogreAttack.png")
    ){
      guy.health -= 1;
      console.log("your health is " + guy.health + "!");
    };
};

bat.update = function(modifier){
  if(this.health<100){
    this.x = -100;
    this.y = -100;
  };
  if(rangeDetector(guy.x,guy.y,bat.x,bat.y,20)===true){
    guy.health -= 5;
  }
};


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
    var $coin = $('<li>');
    $("#item-list").append($coin);
    $coin.text("look, a coin.");
  }
}

gem.update = function(){
    if(
      (currentLevel===2)
      &&
      (rangeDetector(guy.x,guy.y,this.x,this.y)===true)){
        this.y = -100;
        this.x = -100;
      var $gem = $('<li>');
      $("#item-list").append($gem);
      $gem.text("heyyyy a gem.");
    }
}

//========weapons===============

function Weapon(power, x, y){
  this.power = power;
  this.x = x;
  this.y = y;
}

var sword = new Weapon(10, 375, 165);
var axe = new Weapon(15, null, null);
var bow = new Weapon(10, null, null);


sword.update = function(){
  if(
    (currentLevel===1)
    &&
    ((rangeDetector(guy.x,guy.y,sword.x,sword.y)===true))){
      this.y=-100;
      this.x=-100;
      guy.equipSword();
      var $sword = $('<li>');
      $("#item-list").append($sword);
      $sword.text("nice sword!");
    }
}

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

function rangeDetector(firstX,firstY,secondX,secondY, distance){
  if(distance === undefined){
    distance = 20
  };
  if(
    (firstX<secondX+distance && secondX-distance < firstX)
    &&
    (firstY<secondY+distance && secondY-distance <firstY)
  ){
    return true;
  } else {
    return false;
  }
}

//===================getImageData=============================

//get the background image data for the whole canvas as soon as it's set up, set values to an array.
//this way you can check the array on keydown instead of running getImageData every time the collision function runs.

//============ wall detection =====================

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
//                      MENU UPDATE
//===========================================================================
//---------------------------------------------------------------------------

function showStatus(){
    $('#controls').css('display','none');
    $('#show-controls').css('background-color','lightgray');
    $('#status').css('display', 'block');
    $('#show-status').css('background-color','snow');
};

function showControls(){
  $('#status').css('display','none');
  $('#show-status').css('background-color','lightgray');
  $('#controls').css('display', 'block');
  $('#show-controls').css('background-color','snow');
};

function power(){
  showStatus();
  powerOn = true;
}

$('#power').on('click',power);

$('#show-status').on('click', showStatus);
$('#show-controls').on('click', showControls);

$('#reset').on('click', function(){
  location.reload();
})

var kills   = 0

function updateMenu(){
  var killCount = function(){
    if(ogre.x < 0){
      kills++;
    }
    if (bat.x<0){
      kills++;
    }
  };

  $('#level').text(function(){
    if(currentLevel===0){
      return 'home';
    } else{
      return currentLevel;
    };
  });

  $('#health-bar').css('width', guy.health + '%');

  $('#health').text(guy.health);

  $('#kills').text(kills);
}

//---------------------------------------------------------------------------
//===========================================================================
//                UPDATE
//===========================================================================
//---------------------------------------------------------------------------

var update = function (modifier) {

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

var render = function () {

	if (bgs[currentLevel]) {
		ctx.drawImage(bgs[currentLevel].image, 0, 0);
	}

	if(currentLevel===0){
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

  if (swordReady&&currentLevel===1){
    ctx.drawImage(swordImage, sword.x, sword.y)
  }

	if (ogreReady&&currentLevel===1){
		ctx.drawImage(ogreImage, ogre.x, ogre.y)
	}

  if(batReady&&currentLevel===2){
    ctx.drawImage(batImage, bat.x, bat.y);
  }

	if (guyReady){
		ctx.drawImage(guyImage, guy.x+guy.offsetX, guy.y+guy.offsetY);
	}

  // drawFog();

  if(deadReady===true&&guy.health<0){
    ctx.drawImage(deadImage, 0, 0);
    setTimeout(showControls, 2000);
    };


  if(powerOn===false){
      ctx.fillRect(10,10,480,480);
  }

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
