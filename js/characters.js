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
  attackRange: 30,
  direction: "right",
  imageL: "images/guy/guyL.png",
  imageR: "images/guy/guyR.png",
  imageLAttack: "images/guy/guyAttackL.png",
  imageRAttack: "images/guy/guyAttackR.png",
  attacking: false,
  x: 20,
  y: 60,
  offsetX: 0,
  offsetY: 0,
  xp: 0,
  yp: 0,
  disarm: function() {
    this.weapon = "unarmed";
    if (this.weapon === "unarmed") {
      this.imageL = "images/guy/guyL.png";
      this.imageR = "images/guy/guyR.png";
      this.imageLAttack = "images/guy/guyAttackL.png";
      this.imageRAttack = "images/guy/guyAttackR.png";
    }
    this.power = 1;
    this.attackRange = 40;
  },
  equipSword: function() {
    this.weapon = "sword";
    if (this.weapon === "sword") {
      this.imageL = "images/guy/guySwordL.png";
      this.imageR = "images/guy/guySwordR.png";
      this.imageLAttack = "images/guy/guySwordAttackL.png";
      this.imageRAttack = "images/guy/guySwordAttackR.png";
    }
    this.power = 10;
    this.attackRange = 40;
  },
  equipAxe: function() {
    this.weapon = "Axe";
    if (this.weapon === "Axe") {
      this.imageL = "images/guy/guyAxeL.png";
      this.imageR = "images/guy/guyAxeR.png";
      this.imageLAttack = "images/guy/guyAxeAttackL.png";
      this.imageRAttack = "images/guy/guyAxeAttackR.png";
    }
    this.power = 25;
    this.attackRange = 50;
  },
  becomeWizard: function() {
    this.weapon = "staff";
    if (this.weapon === "staff") {
      this.imageL = "images/guy/guyWizardL.png";
      this.imageR = "images/guy/guyWizardR.png";
      this.imageLAttack = "images/guy/guyWizardAttackL.png";
      this.imageRAttack = "images/guy/guyWizardAttackR.png";
    };
    this.power = 100;
    this.attackRange = 50;
  },
  attack: function() {
    console.log('hyaaaa!');
    if (this.direction === "left") {
      guyImage.src = guy.imageLAttack;
      this.offsetX = -30;
      this.offsetY = -2;
      setTimeout(function() {
        guy.offsetX = 0;
        guy.offsetY = 0;
        guyImage.src = guy.imageL;
      }, 100);
    } else if (this.direction === "right") {
      this.offsetX = 0;
      this.offsetY = -2
      guyImage.src = this.imageRAttack;
      setTimeout(function() {
        guyImage.src = guy.imageR;
        guy.offsetX = 0;
        guy.offsetY = 0;
      }, 100);
    };
    damageInflictor(ogre);
    damageInflictor(bat);
    damageInflictor(greenDragon);
    damageInflictor(skeleton);
    damageInflictor(redDragon);
  },
  update: function(modifier) {

    var nextPixelUp = this.y - this.speed * modifier;
    var nextPixelDown = this.y + this.speed * modifier;
    var nextPixelLeft = this.x - this.speed * modifier;
    var nextPixelRight = this.x + this.speed * modifier;

    if (keysDown[38] === true || keysDown[87] === true) { // up
      if (collision(this.x, nextPixelUp, 30, 30) === true) {
        this.y = this.y;
      } else {
        this.y = nextPixelUp;
      }
    }

    if (keysDown[40] === true || keysDown[83] === true) { // down
      if (collision(this.x, nextPixelDown, 30, 30) === true) {
        this.y = this.y;
      } else {
        this.y = nextPixelDown;
      }
    }

    if (keysDown[37] === true || keysDown[65] === true) { // left
      this.direction = "left";
      guyImage.src = guy.imageL;
      if (collision(nextPixelLeft, this.y, 30, 30) === true) {
        this.x = this.x;
      } else if ((currentLevel === 1) && (this.x < ogre.x + 30)) {
        this.x = this.x;
      } else {
        this.x = nextPixelLeft;
      }
    }

    if (keysDown[39] === true || keysDown[68] === true) { //right
      this.direction = "right";
      guyImage.src = guy.imageR;
      if (collision(nextPixelRight, this.y, 30, 30) === true) {
        this.x = this.x;
      } else {
        this.x = nextPixelRight;
      }
    }

    if (keysDown[32] === true || keysDown[67] === true) {
      this.attacking = true;
    } else {
      this.attacking = false;
    }

    if (this.attacking === true) {
      this.attack();
    }

    if (keysDown[77] === true) {
      this.becomeWizard();
    }
    if (keysDown[78] === true) {
      this.equipSword();
    }
    if (keysDown[66] === true) {
      this.equipAxe();
    }
    if (keysDown[188] === true) {
      this.disarm();
    }
    if (guy.health > 100) {
      guy.health = 100;
    }
  }
};

function damageInflictor(enemy) {
  if (
    (currentLevel === enemy.level) &&
    (rangeDetector(guy.x, guy.y, enemy.x, enemy.y, guy.attackRange) ===
      true) &&
    (guy.attacking === true)
  ) {
    punchSound.play();
    enemy.health = enemy.health - guy.power;
  }
};

//============================enemies==============================

var allEnemies = [];

var START_ENEMIES = 5;

function kills() {
  return START_ENEMIES - allEnemies.length;
};

function Enemy(name, level, health, power, attackRange, x, y) {
  this.name = name;
  this.level = level;
  this.health = health;
  this.power = power;
  this.attackRange = attackRange;
  this.attacking = false;
  this.x = x;
  this.y = y;
  allEnemies.push(this);
};


Enemy.prototype = {
  danceAround: function() {
    console.log('lalala');
    this.health++;
  },
  update: function(modifier) {
    if (
      (currentLevel === this.level) &&
      (rangeDetector(guy.x, guy.y, this.x, this.y, this.attackRange) ===
        true) &&
      (this.attacking === true)
    ) {
      guy.health -= this.power;
      if (guy.direction === "right") {
        guy.x -= 40;
      }
      if (guy.direction === "left") {
        guy.x += 40;
      }
    }
    if (this.health < 0) {
      this.x = -100;
      this.y = -100;
      var index = allEnemies.indexOf(this);
      if (index > -1) {
        allEnemies.splice(index, 1);
      }
    }
    this.attack();
  }
};

var ogre = new Enemy('ogre', 1, 50, 2, 30, 50, 225);
var bat = new Enemy('bat', 2, 100, 4, 20, 250, 400);
var greenDragon = new Enemy('greenDragon', 4, 200, 500, 30, 270, 450);
var skeleton = new Enemy('skeleton', 5, 500, 150, 40, 340, 295);
var redDragon = new Enemy('redDragon', 6, 1000, 1000, 35, 380, 193);


ogre.attack = function() {
  if (timingIntervals.percentage(70)) {
    this.attacking = true;
  } else {
    this.attacking = false;
  }
  if (this.attacking === true) {
    ogreImage.src = "images/enemies/ogreAttack.png";
  } else {
    ogreImage.src = "images/enemies/ogre.png";
  }
};

bat.attack = function() {
  if (currentLevel === 2) {
    this.attacking = true;
  } else {
    this.attacking = false;
  }
  if (n < 25) {
    batImage.src = "images/enemies/bat01.png";
  }
  if ((n > 25 && n < 50) || (n > 75)) {
    batImage.src = "images/enemies/bat02.png";
  }
  if (n > 50 && n < 75) {
    batImage.src = "images/enemies/bat03.png";
  }
};

greenDragon.attack = function() {
  if (currentLevel === 4) {
    this.attacking = true;
  } else {
    this.attacking = false;
  }
};

redDragon.attack = function() {
  if (currentLevel === 6) {
    this.attacking = true;
  } else {
    this.attacking = false;
  }
};

skeleton.image = [
  "images/enemies/skeleton02.png",
  "images/enemies/skeleton03.png",
  "images/enemies/skeleton04.png",
  "images/enemies/skeleton05.png",
  "images/enemies/skeleton04.png",
  "images/enemies/skeleton03.png",
  "images/enemies/skeleton02.png",
  "images/enemies/skeleton01.png",
  "images/enemies/skeleton01.png",
  "images/enemies/skeleton01.png",
  "images/enemies/skeleton01.png",
  "images/enemies/skeleton01.png"
];

skeleton.attack = function() {
  var index = Math.floor(n / 9);
  skeletonImage.src = skeleton.image[index];
  if (currentLevel === 5 && (index < 6)) {
    this.attacking = true;
  } else {
    this.attacking = false;
  }

};

redDragon.image = [
  "images/enemies/redDragon01.png",
  "images/enemies/redDragon01.png",
  "images/enemies/redDragon01.png",
  "images/enemies/redDragon02.png",
  "images/enemies/redDragon03.png",
  "images/enemies/redDragon02.png",
  "images/enemies/redDragon03.png",
  "images/enemies/redDragon02.png",
  "images/enemies/redDragon03.png",
  "images/enemies/redDragon02.png",
];

redDragon.attack = function() {
  var index = Math.floor(n / 11);
  if (currentLevel === 4) {
    redDragonImage.src = redDragon.image[0];
  }
  if (currentLevel === 6) {
    redDragonImage.src = redDragon.image[index];
    if (index > 2) {
      redDragon.attacking = true;
    } else {
      redDragon.attacking = false;
    }
  }
};

function updateEnemies() {
  ogre.update();
  bat.update();
  greenDragon.update();
  skeleton.update();
  redDragon.update();
};

function drawEnemies() {
  if (ogreReady && currentLevel === 1) {
    ctx.drawImage(ogreImage, ogre.x, ogre.y)
  }

  if (batReady && currentLevel === 2) {
    ctx.drawImage(batImage, bat.x, bat.y);
  }

  if (greenDragonReady && currentLevel === 4) {
    ctx.drawImage(greenDragonImage, greenDragon.x, greenDragon.y);
  }

  if (skeletonReady && currentLevel === 5) {
    ctx.drawImage(skeletonImage, skeleton.x, skeleton.y);
  }

  if (redDragonReady && (currentLevel === 6) || (currentLevel === 4)) {
    ctx.drawImage(redDragonImage, redDragon.x, redDragon.y);
  }
};


//======================items==============================

function Item(level, health, x, y) {
  this.x = x;
  this.y = y;
  this.health = health;
  this.level = level;
  this.update = function() {
    if ((currentLevel === this.level) &&
      (rangeDetector(guy.x, guy.y, this.x, this.y) === true)) {
      this.x = -100;
      this.y = -100;
      guy.health += this.health
      this.removeItem();
    }
  };
};

var house = new Item(0, 0, null, null);
var stairs = new Item(0, 0, 355, 365);
var coin = new Item(1, 0, 200, 375);
var gem = new Item(2, 0, 320, 65);
var crown = new Item(4, 0, null, null);
var heart = new Item(1, 20, 130, 125);
var apple = new Item(2, 20, 320, 455);
var sandwich = new Item(3, 20, 320, 460);
var friedChicken = new Item(5, 20, 215, 15);

coin.removeItem = function() {
  var $coin = $('<li>');
  $("#status ul").append($coin);
  $coin.text("look, a coin.");
};

gem.removeItem = function() {
  var $gem = $('<li>');
  $("#status ul").append($gem);
  $gem.text("heyyyy a gem.");
};

heart.removeItem = function() {
  var $heart = $('<li>');
  $("#status ul").append($heart);
  $heart.text("awww heartssss");
};

apple.removeItem = function() {
  var $apple = $('<li>');
  $("#status ul").append($apple);
  $apple.text("yummm apple");
};

sandwich.removeItem = function() {
  var $sandwich = $('<li>');
  $("#status ul").append($sandwich);
  $sandwich.text("is that a sandwich?");
};

friedChicken.removeItem = function() {
  var $friedChicken = $('<li>');
  $("#status ul").append($friedChicken);
  $friedChicken.text("delicious fried chickennnnnn");
};

function updateItems() {
  coin.update();
  gem.update();
  heart.update();
  apple.update();
  sandwich.update();
  friedChicken.update();
};

function drawItems() {
  if (currentLevel === 0) {
    ctx.drawImage(houseImage, 10, 10);
  }

  if (coinReady && currentLevel === 1) {
    ctx.drawImage(coinImage, coin.x, coin.y)
  }

  if (gemReady && currentLevel === 2) {
    ctx.drawImage(gemImage, gem.x, gem.y)
  }

  if (heartReady && currentLevel === 1) {
    ctx.drawImage(heartImage, heart.x, heart.y)
  }

  if (appleReady && currentLevel === 2) {
    ctx.drawImage(appleImage, apple.x, apple.y)
  }
  if (sandwichReady && currentLevel === 3) {
    ctx.drawImage(sandwichImage, sandwich.x, sandwich.y)
  }
  if (friedChickenReady && currentLevel === 5) {
    ctx.drawImage(friedChickenImage, friedChicken.x, friedChicken.y)
  }
};

//========weapons===============


var allWeapons = [];

function Weapon(name, level, power, x, y) {
  this.power = power;
  this.level = level;
  this.x = x;
  this.y = y;
  this.update = function() {
    if (
      (currentLevel === this.level) &&
      (rangeDetector(guy.x, guy.y, this.x, this.y) === true)
    ) {
      this.x = -100;
      this.y = -100;
      this.equip();
    }
  }
};

var sword = new Weapon('sword', 1, 10, 30, 450);
var axe = new Weapon('axe', 3, 50, 270, 115);
var staff = new Weapon('staff', 5, 100, 465, 10);


sword.equip = function() {
  guy.equipSword();
  var $sword = $('<li>');
  $("#status ul").append($sword);
  $sword.text("nice sword!");
  allWeapons.push(this);
};

axe.equip = function() {
  guy.equipAxe();
  var $axe = $('<li>');
  $("#status ul").append($axe);
  $axe.text("battle axe!!");
  allWeapons.push(this);
};

staff.equip = function() {
  guy.becomeWizard();
  var $staff = $('<li>');
  $("#status ul").append($staff);
  $staff.text("wizardddd!!!");
  allWeapons.push(this);
};

function updateWeapons() {
  sword.update();
  axe.update();
  staff.update();
};

function drawWeapons() {
  if (swordReady && currentLevel === 1) {
    ctx.drawImage(swordImage, sword.x, sword.y)
  }

  if (axeReady && currentLevel === 3) {
    ctx.drawImage(axeImage, axe.x, axe.y);
  }

  if (staffReady && currentLevel === 5) {
    ctx.drawImage(staffImage, staff.x, staff.y);
  }
};
