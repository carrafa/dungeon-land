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
  loadLevel("/images/bgs/bg04.png"),
  loadLevel("/images/bgs/bg05.png"),
  loadLevel("/images/bgs/bg06.png"),
  loadLevel("/images/bgs/bg00.png")
];

//================dead=====================

var deadReady = false;
var deadImage = new Image();
deadImage.onload = function() {
  deadReady = true;
};
deadImage.src = "/images/bgs/dead.png";

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

var guyAxeLReady = false;
var guyAxeLImage = new Image();
guyAxeLImage.onload = function() {
  guyAxeLReady = true;
};
guyAxeLImage.src = "/images/guy/guyAxeL.png";

var guyAxeRReady = false;
var guyAxeRImage = new Image();
guyAxeRImage.onload = function() {
  guyAxeRReady = true;
};
guyAxeRImage.src = "/images/guy/guyAxeR.png";

var guyAxeAttackLReady = false;
var guyAxeAttackLImage = new Image();
guyAxeAttackLImage.onload = function() {
  guyAxeAttackLReady = true;
};
guyAxeAttackLImage.src = "/images/guy/guyAxeAttackL.png";

var guyAxeAttackRReady = false;
var guyAxeAttackRImage = new Image();
guyAxeAttackRImage.onload = function() {
  guyAxeAttackRReady = true;
};
guyAxeAttackRImage.src = "/images/guy/guyAxeAttackR.png";

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


//======weapon images===================

var swordReady = false;
var swordImage = new Image();
swordImage.onload = new function() {
  swordReady = true;
};
swordImage.src = "/images/weapons/sword.png"

var axeReady = false;
var axeImage = new Image();
axeImage.onload = new function() {
  axeReady = true;
};
axeImage.src = "/images/weapons/axe.png"

var staffReady = false;
var staffImage = new Image();
staffImage.onload = new function() {
  staffReady = true;
};
staffImage.src = "/images/weapons/staff.png"

//======enemy images===================

var ogreReady = false;
var ogreImage = new Image();
ogreImage.onload = function() {
  ogreReady = true;
};
ogreImage.src = "/images/enemies/ogre.png";

var ogreAttackReady = false;
var ogreAttackImage = new Image();
ogreAttackImage.onload = function() {
  ogreAttackReady = true;
};
ogreAttackImage.src = "/images/enemies/ogreAttack.png";

var batReady = false;
var batImage = new Image();
batImage.onload = function() {
  batReady = true;
};
batImage.src = "/images/enemies/bat01.png";

var bat02Ready = false;
var bat02Image = new Image();
bat02Image.onload = function() {
  bat02Ready = true;
};
bat02Image.src = "/images/enemies/bat02.png";

var bat03Ready = false;
var bat03Image = new Image();
bat03Image.onload = function() {
  bat03Ready = true;
};
bat03Image.src = "/images/enemies/bat03.png";

var greenDragonReady = false;
var greenDragonImage = new Image();
greenDragonImage.onload = function() {
  greenDragonReady = true;
};
greenDragonImage.src = "/images/enemies/greenDragon.png";

var skeletonReady = false;
var skeletonImage = new Image();
skeletonImage.onload = function() {
  skeletonReady = true;
};
skeletonImage.src = "/images/enemies/skeleton01.png";

var redDragonReady = false;
var redDragonImage = new Image();
redDragonImage.onload = function() {
  redDragonReady = true;
};
redDragonImage.src = "/images/enemies/redDragon01.png";

var redDragon02Ready = false;
var redDragon02Image = new Image();
redDragon02Image.onload = function() {
  redDragon02Ready = true;
};
redDragon02Image.src = "/images/enemies/redDragon02.png";

var redDragon03Ready = false;
var redDragon03Image = new Image();
redDragon03Image.onload = function() {
  redDragon03Ready = true;
};
redDragon03Image.src = "/images/enemies/redDragon03.png";

//=====traps=======

var flameReady = false;
var flameImage = new Image();
flameImage.onload = function() {
  flameReady = true;
};
flameImage.src = "/images/traps/flame01.png";

var flame02Ready = false;
var flame02Image = new Image();
flame02Image.onload = function() {
  flame02Ready = true;
};
flame02Image.src = "/images/traps/flame02.png";

var flame03Ready = false;
var flame03Image = new Image();
flame03Image.onload = function() {
  flame03Ready = true;
};
flame03Image.src = "/images/traps/flame03.png";
