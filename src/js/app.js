//global variables
let lives = 3;
let levels = 0;
let speed = 2;
let whoEnemy;
let randomSelectedEnemy;



// The GOAL!
function Sun(x, y) {

  this.x = x;
  this.y = y;

}




// Enemies our player must avoid
function Enemy(x, y, style, direction, speed) {
  this.x = x;
  this.y = y;
  this.style = style;
  this.direction = direction;
  this.speed = speed;

}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  if (this.x < 800 && this.x > 0 && (this.direction == 'rtl')) {
    this.x += 1 + this.speed;
  }
  else if (this.x >= 800 && (this.direction == 'rtl')) {
    //reverse ltr
    this.direction = 'ltr';
    this.x -= 1 + this.speed;
  }
  else if (this.x > 0 && this.x < 800 && (this.direction = 'ltr')) {
    this.x -= 1 + this.speed;
  }
  else if (this.x <= 0 && (this.direction = 'ltr')) {
    //this.x =< 0 >> reverse rtl
    this.direction = 'rtl';
    this.x += 1 + this.speed;
  }


  //levels and lives to html
  document.querySelector("#lives").lastChild.innerHTML = lives;
  document.querySelector("#score").lastChild.innerHTML = levels;

  this.hitcheckEnemy(player, allEnemies);
  this.hitcheckSun();


};

//hit enemy
Enemy.prototype.hitcheckEnemy = function (rect1, rect2) {
  const width = 70; //picture detail
  const enemyHeight = 70;
  const playerHeight = 80;

  rect2.forEach(function (ele) {

    if (rect1.x < ele.x + width &&
      rect1.x + width > ele.x &&
      rect1.y < ele.y + enemyHeight &&
      playerHeight + rect1.y > ele.y) {

      //lives decrease
      lives -= 1;
      //lives = lives -1 

      //player relocation 
      rect1.x = 300;
      rect1.y = 400;

      //end game
      if (lives <= 0) {
        alert('GAME END');
        //restore lives again
        lives = 3;
        //enemy speed restore
        allEnemies.forEach(function (ele2) {
          ele2.speed = 2;
        });
        //global speed restore;
        speed = 2;
        // randomSelectedEnemy.speed = 1;
        //level restore
        levels = 0;
      }
      return true;
    }
    return false;
  });
}

//hit sun
Enemy.prototype.hitcheckSun = function () {
  if (player.x > 219 && player.x < 381 && player.y < 91) {
    
    //increase speed enemy randomly
    //selection enemy
    whoEnemy = parseInt(randomRange(0, 2));
    randomSelectedEnemy = allEnemies[whoEnemy]
    //increase speed
    speed += speed;
    //enemy speed up
    randomSelectedEnemy.speed = speed;

    //increase level
    levels += 1;
    //player relocation 
    player.x = 300;
    player.y = 400;
  }
}

function randomRange(n1, n2) {
  return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
}


// Now write your own player class

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(dt) {
  }

  handleInput(which) {
    // player movement
    if (which == 'left' && this.x >= 0) {
      this.x -= 20;
    } else if (which == 'up') {
      if (this.y <= 0) {
        return this.y = 20;
      }
      this.y -= 20;
    } else if (which == 'right' && this.x > -1 && this.x <= 799) {
      this.x += 20;
    }
    else if (which == 'down' && this.y > -1 && this.y <= 439) {
      this.y += 20;
    }
  }
};

// Now instantiate your objects.
let player = new Player(300, 400);
let sun = new Sun(300, 10);
let allEnemies = [
  (new Enemy(200, 80, 'enemy1', 'rtl', 2)),
  (new Enemy(100, 150, 'enemy2', 'rtl', 2)),
  (new Enemy(300, 250, 'enemy3', 'rtl', 2))
];

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});





















