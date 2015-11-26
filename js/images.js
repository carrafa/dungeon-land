//---------------------------------------------------------------------------
//===========================================================================
//                SETTING IMAGES
//===========================================================================
//---------------------------------------------------------------------------

//===========background images =============

function loadLevel(url) {
  var image = new Image();
  var level = {
    image: image,
    ready: false,
  };
  image.onload = function() {
    level.ready = true;
  };
  image.src = url;
  return level;
};

var bgs = [
  loadLevel("/images/bgs/bg00.png"),
  loadLevel("/images/bgs/bg01.png"),
  loadLevel("/images/bgs/bg02.png"),
  loadLevel("/images/bgs/bg03.png"),
  loadLevel("/images/bgs/bg00.png"),
  loadLevel("/images/bgs/bg00.png")
];

//================dead=====================

var deadReady = false;
var deadImage = new Image();
deadImage.onload = function() {
  deadReady = true;
};
deadImage.src = "/images/bgs/dead.png";

var resetReady = false;
var resetImage = new Image();
resetImage.onload = function() {
  resetReady = true;
};
resetImage.src = "/images/bgs/reset.png";

//======character images===================

var guyReady = false;
var guyImage = new Image();
guyImage.onload = function() {
  guyReady = true;
};
guyImage.src = "/images/guy/guyR.png";

var guyLReady = false;
var guyLImage = new Image();
guyLImage.onload = function() {
  guyLReady = true;
};
guyLImage.src = "/images/guy/guyL.png";

var guyAttackLReady = false;
var guyAttackLImage = new Image();
guyAttackLImage.onload = function() {
  guyAttackLReady = true;
};
guyAttackLImage.src = "/images/guy/guyAttackL.png";

var guyAttackRReady = false;
var guyAttackRImage = new Image();
guyAttackRImage.onload = function() {
  guyAttackRReady = true;
};
guyAttackRImage.src = "/images/guy/guyAttackR.png";

var guySwordLReady = false;
var guySwordLImage = new Image();
guySwordLImage.onload = function() {
  guySwordLReady = true;
};
guySwordLImage.src = "/images/guy/guySwordL.png";

var guySwordRReady = false;
var guySwordRImage = new Image();
guySwordRImage.onload = function() {
  guySwordRReady = true;
};
guySwordRImage.src = "/images/guy/guySwordR.png";

var guySwordAttackLReady = false;
var guySwordAttackLImage = new Image();
guySwordAttackLImage.onload = function() {
  guySwordAttackLReady = true;
};
guySwordAttackLImage.src = "/images/guy/guySwordAttackL.png";

var guySwordAttackRReady = false;
var guySwordAttackRImage = new Image();
guySwordAttackRImage.onload = function() {
  guySwordAttackRReady = true;
};
guySwordAttackRImage.src = "/images/guy/guySwordAttackR.png";

var guyWizardLReady = false;
var guyWizardLImage = new Image();
guyWizardLImage.onload = function() {
  guyWizardLReady = true;
};
guyWizardLImage.src = "/images/guy/guyWizardL.png";

var guyWizardRReady = false;
var guyWizardRImage = new Image();
guyWizardRImage.onload = function() {
  guyWizardRReady = true;
};
guyWizardRImage.src = "/images/guy/guyWizardR.png";

var guyWizardAttackLReady = false;
var guyWizardAttackLImage = new Image();
guyWizardAttackLImage.onload = function() {
  guyWizardAttackLReady = true;
};
guyWizardAttackLImage.src = "/images/guy/guyWizardAttackL.png";

var guyWizardAttackRReady = false;
var guyWizardAttackRImage = new Image();
guyWizardAttackRImage.onload = function() {
  guyWizardAttackRReady = true;
};
guyWizardAttackRImage.src = "/images/guy/guyWizardAttackR.png";

//======building/item images===================

var houseReady = false;
var houseImage = new Image();
houseImage.onload = function() {
  houseReady = true;
};
houseImage.src = "/images/items/house.png";

var stairsReady = false;
var stairsImage = new Image();
stairsImage.onload = function() {
  stairsReady = true;
};
stairsImage.src = "/images/items/stairsL.png";

var coinReady = false;
var coinImage = new Image();
coinImage.onload = new function() {
  coinReady = true;
};
coinImage.src = "/images/items/coin.png"

var gemReady = false;
var gemImage = new Image();
gemImage.onload = new function() {
  gemReady = true;
};
gemImage.src = "/images/items/gem.png"

var swordReady = false;
var swordImage = new Image();
swordImage.onload = new function() {
  swordReady = true;
};
swordImage.src = "/images/items/sword.png"

//======enemy images===================

var ogreReady = false;
var ogreImage = new Image();
ogreImage.onload = function() {
  ogreReady = true;
}
ogreImage.src = "/images/enemies/ogre.png";

var ogreAttackReady = false;
var ogreAttackImage = new Image();
ogreAttackImage.onload = function() {
  ogreAttackReady = true;
}
ogreAttackImage.src = "/images/enemies/ogreAttack.png";

var batReady = false;
var batImage = new Image();
batImage.onload = function() {
  batReady = true;
}
batImage.src = "/images/enemies/bat01.png";
