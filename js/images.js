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
  loadLevel("/images/bg00.png"),
  loadLevel("/images/bg01.png"),
  loadLevel("/images/bg02.png"),
  loadLevel("/images/bg03.png"),
  loadLevel("/images/bg00.png"),
  loadLevel("/images/bg00.png")
];

//================dead=====================

var deadReady = false;
var deadImage = new Image();
deadImage.onload = function() {
  deadReady = true;
};
deadImage.src = "/images/dead.png";

var resetReady = false;
var resetImage = new Image();
resetImage.onload = function() {
  resetReady = true;
};
resetImage.src = "/images/reset.png";

//======character images===================

var guyReady = false;
var guyImage = new Image();
guyImage.onload = function() {
  guyReady = true;
};
guyImage.src = "/images/guyR.png";

var guyLReady = false;
var guyLImage = new Image();
guyLImage.onload = function() {
  guyLReady = true;
};
guyLImage.src = "/images/guyL.png";

var guyAttackLReady = false;
var guyAttackLImage = new Image();
guyAttackLImage.onload = function() {
  guyAttackLReady = true;
};
guyAttackLImage.src = "/images/guyAttackL.png";

var guyAttackRReady = false;
var guyAttackRImage = new Image();
guyAttackRImage.onload = function() {
  guyAttackRReady = true;
};
guyAttackRImage.src = "/images/guyAttackR.png";

var guySwordLReady = false;
var guySwordLImage = new Image();
guySwordLImage.onload = function() {
  guySwordLReady = true;
};
guySwordLImage.src = "/images/guySwordL.png";

var guySwordRReady = false;
var guySwordRImage = new Image();
guySwordRImage.onload = function() {
  guySwordRReady = true;
};
guySwordRImage.src = "/images/guySwordR.png";

var guySwordAttackLReady = false;
var guySwordAttackLImage = new Image();
guySwordAttackLImage.onload = function() {
  guySwordAttackLReady = true;
};
guySwordAttackLImage.src = "/images/guySwordAttackL.png";

var guySwordAttackRReady = false;
var guySwordAttackRImage = new Image();
guySwordAttackRImage.onload = function() {
  guySwordAttackRReady = true;
};
guySwordAttackRImage.src = "/images/guySwordAttackR.png";

var guyWizardLReady = false;
var guyWizardLImage = new Image();
guyWizardLImage.onload = function() {
  guyWizardLReady = true;
};
guyWizardLImage.src = "/images/guyWizardL.png";

var guyWizardRReady = false;
var guyWizardRImage = new Image();
guyWizardRImage.onload = function() {
  guyWizardRReady = true;
};
guyWizardRImage.src = "/images/guyWizardR.png";

var guyWizardAttackLReady = false;
var guyWizardAttackLImage = new Image();
guyWizardAttackLImage.onload = function() {
  guyWizardAttackLReady = true;
};
guyWizardAttackLImage.src = "/images/guyWizardAttackL.png";

var guyWizardAttackRReady = false;
var guyWizardAttackRImage = new Image();
guyWizardAttackRImage.onload = function() {
  guyWizardAttackRReady = true;
};
guyWizardAttackRImage.src = "/images/guyWizardAttackR.png";

//======building/item images===================

var houseReady = false;
var houseImage = new Image();
houseImage.onload = function() {
  houseReady = true;
};
houseImage.src = "/images/house.png";

var stairsReady = false;
var stairsImage = new Image();
stairsImage.onload = function() {
  stairsReady = true;
};
stairsImage.src = "/images/stairsL.png";

var coinReady = false;
var coinImage = new Image();
coinImage.onload = new function() {
  coinReady = true;
};
coinImage.src = "/images/coin.png"

var gemReady = false;
var gemImage = new Image();
gemImage.onload = new function() {
  gemReady = true;
};
gemImage.src = "/images/gem.png"

var swordReady = false;
var swordImage = new Image();
swordImage.onload = new function() {
  swordReady = true;
};
swordImage.src = "/images/sword.png"

//======enemy images===================

var ogreReady = false;
var ogreImage = new Image();
ogreImage.onload = function() {
  ogreReady = true;
}
ogreImage.src = "/images/ogre.png";

var ogreAttackReady = false;
var ogreAttackImage = new Image();
ogreAttackImage.onload = function() {
  ogreAttackReady = true;
}
ogreAttackImage.src = "/images/ogreAttack.png";

var batReady = false;
var batImage = new Image();
batImage.onload = function() {
  batReady = true;
}
batImage.src = "/images/bat01.png";
