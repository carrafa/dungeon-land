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
  attacking: false,
  x: 20,
  y: 60,
  offsetX: 0,
  offsetY: 0,
  xp: 0,
  yp: 0,
  equipSword: function() {
    guy.weapon = "sword";
    if (guy.weapon === "sword") {
      guy.imageL = "/images/guySwordL.png";
      guy.imageR = "/images/guySwordR.png";
      guy.imageLAttack = "/images/guySwordAttackL.png";
      guy.imageRAttack = "/images/guySwordAttackR.png";
    }
    guy.power = 5;
  },
  becomeWizard: function() {
    guy.weapon = "wizard";
    if (guy.weapon === "wizard") {
      guy.imageL = "/images/guyWizardL.png";
      guy.imageR = "/images/guyWizardR.png";
      guy.imageLAttack = "/images/guyWizardAttackL.png";
      guy.imageRAttack = "/images/guyWizardAttackR.png";
    };
    guy.power = 100;
  },
  attack: function() {
    console.log('hyaaaa!');
    if (guyImage.src === "http://localhost:8080" + guy.imageL) {
      guyImage.src = guy.imageLAttack;
      guy.offsetX = -30;
      guy.offsetY = -10;
      setTimeout(function() {
        guyImage.src = guy.imageL;
        guy.offsetX = 0;
        guy.offsetY = 0;
      }, 100);
    } else if (guyImage.src === "http://localhost:8080" + guy.imageR) {
      guyImage.src = guy.imageRAttack;
      this.offsetY = -10;
      setTimeout(function() {
        guyImage.src = guy.imageR;
        guy.offsetY = 0;
      }, 100);
    };
    if ((rangeDetector(guy.x, guy.y, ogre.x, ogre.y, 30) === true) &&
      (guyImage.src === "http://localhost:8080" + guy.imageLAttack)
    ) {
      punchSound.play();
      ogre.health = ogre.health - guy.power;
    };
    if ((rangeDetector(guy.x, guy.y, bat.x, bat.y, 40) === true) &&
      (guyImage.src === "http://localhost:8080" + guy.imageLAttack)
    ) {
      bat.health = bat.health - guy.power;
    };
  },

  update: function(modifier) {

    var nextPixelUp = this.y - this.speed * modifier;
    var nextPixelDown = this.y + this.speed * modifier;
    var nextPixelLeft = this.x - this.speed * modifier;
    var nextPixelRight = this.x + this.speed * modifier;

    if (keysDown[38] === true || keysDown[87] === true) { // up
      if (collision('up') === true) {
        this.y = this.y
      } else {
        this.y = nextPixelUp;
      }
    };

    if (keysDown[40] === true || keysDown[83] === true) { // down
      if (collision('down') === true) {
        this.y = this.y;
      } else {
        this.y = nextPixelDown;
      }
    };

    if (keysDown[37] === true || keysDown[65] === true) { // left
      guyImage.src = guy.imageL;
      guy.offsetX = 0;
      guy.offsetY = 0;
      if (collision('left') === true) {
        this.x = this.x;
      } else if ((currentLevel === 1) && (this.x < ogre.x + 30)) {
        this.x = this.x;
      } else {
        this.x = nextPixelLeft;
      }
    };

    if (keysDown[39] === true || keysDown[68] === true) { //right
      guyImage.src = guy.imageR;
      guy.offsetX = 0;
      guy.offsetY = 0;
      if (collision('right') === true) {
        this.x = this.x;
      } else {
        this.x = nextPixelRight;
      }

    };

    if (keysDown[32] === true || keysDown[67] === true) {
      this.attack();
    };

    if (keysDown[77] === true) {
      this.becomeWizard();
    };
    if (keysDown[78] === true) {
      this.equipSword();
    }
  }
};

if (guy.health < 0) {
  theme.pause();
  guyDeadTheme.play();
}

//============================enemies==============================

var allEnemies = [];

var START_ENEMIES = 5;

var kills = START_ENEMIES - allEnemies.length;

function Enemy(name, health, power, attackRange, x, y) {
  this.name = name;
  this.health = health;
  this.power = power;
  this.attackRange = attackRange;
  this.attacking = false;
  this.x = x;
  this.y = y;
  allEnemies.push(this);
}


Enemy.prototype = {
  danceAround: function() {
    console.log('lalala');
    this.health++;
  },
  update: function(modifier) {
    if (
      (rangeDetector(guy.x, guy.y, this.x, this.y, this.attackRange) ===
        true) &&
      (this.attacking === true)
    ) {
      guy.health -= this.power;
    };
    if (this.health < 0) {
      this.x = -100;
      this.y = -100;
    };
    this.attack();
  }
};

var ogre = new Enemy('ogre', 50, 2, 30, 50, 225);
var bat = new Enemy('bat', 100, 4, 20, 250, 400);
var skeleton = new Enemy('skeleton', 150, 150, null, null, null);
var greenDragon = new Enemy('greenDragon', 500, 500, null, null, null);
var redDragon = new Enemy('redDragon', 1000, 1000, null, null, null);

ogre.attack = function() {
  if ((n > 10 && n < 25) || (n > 45)) {
    this.attacking = true;
  } else {
    this.attacking = false;
  };
  if (this.attacking === true) {
    ogreImage.src = "/images/ogreAttack.png";
  } else {
    ogreImage.src = "/images/ogre.png";
  };
}

bat.attack = function() {
  this.attacking = true;
};


//======================items==============================

function Item(level, x, y) {
  this.x = x;
  this.y = y;
  this.level = level;
  this.update = function() {
    if ((currentLevel === this.level) &&
      (rangeDetector(guy.x, guy.y, this.x, this.y) === true)) {
      this.x = -100;
      this.y = -100;
      this.removeItem();
    }
  };
};

var house = new Item(0, null, null);
var stairs = new Item(0, 355, 365);
var coin = new Item(1, 200, 375);
var gem = new Item(2, 320, 65);
var guitar = new Item(3, null, null);
var tiara = new Item(4, null, null);

coin.removeItem = function() {
  var $coin = $('<li>');
  $("#item-list").append($coin);
  $coin.text("look, a coin.");
};

gem.update = function() {
  if (
    (currentLevel === 2) &&
    (rangeDetector(guy.x, guy.y, this.x, this.y) === true)) {
    this.y = -100;
    this.x = -100;
    var $gem = $('<li>');
    $("#item-list").append($gem);
    $gem.text("heyyyy a gem.");
  }
};

//========weapons===============

var allWeapons = [];

function Weapon(name, power, level, x, y) {
  this.power = power;
  this.x = x;
  this.y = y;
  this.update = function() {
    if (
      (currentLevel === level) &&
      (rangeDetector(guy.x, guy.y, this.x, this.y) === true)
    ) {
      this.x = -100;
      this.y = -100;
      ßthis.equip();
    };
  }
}

var sword = new Weapon('sword', 10, 1, 375, 165);
var axe = new Weapon('axe', 50, 3, null, null);
var staff = new Weapon('staff', 5, 100, null, null);


sword.equip = function() {
  guy.equipSword();
  var $sword = $('<li>');
  $("#item-list").append($sword);
  $sword.text("nice sword!");
  allWeapons.push(this);
};