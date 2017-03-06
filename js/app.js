// VARIABLES
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 536;
var LOWER_EDGE_HEIGHT = 40;
var ROW_HEIGHT = (CANVAS_HEIGHT-LOWER_EDGE_HEIGHT)/6;

var PLAYER_START_X = 200;
var PLAYER_START_Y = 600;

var PLAYER_WIDTH = 101;
var PLAYER_HEIGHT = 171;

var ENEMY_WIDTH = 101;
var ENEMY_HEIGHT = 171;



var ENEMY_HEIGHTS = [ROW_HEIGHT*3 - ROW_HEIGHT/4, ROW_HEIGHT*2 - ROW_HEIGHT/4, ROW_HEIGHT*1 - ROW_HEIGHT/4]

var COL_WIDTH = CANVAS_WIDTH/5;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // wrap around from right to left for enemies only
    if (this.x >= CANVAS_WIDTH) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkForCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

    switch(keyCode) {
        case "left":
            player.x -= COL_WIDTH;
            break;
        case "right":
            player.x += COL_WIDTH;
            break;
        case "up":
            player.y -= ROW_HEIGHT;
            break;
         case "down":
            player.y += ROW_HEIGHT;
            break;
        default:
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(PLAYER_START_X, PLAYER_START_Y);


// Handle collisions with enemies or edges
var checkForCollision = function(enemy) {
    // check for collision between enemy and player
    // if (
    //     player.y + 131 >= enemy.y + 90
    //     && player.x + 25 <= enemy.x + 88
    //     && player.y + 73 <= enemy.y + 135
    //     && player.x + 76 >= enemy.x + 11) 

        if (Math.abs(enemy.x - player.x) < PLAYER_WIDTH/3 && Math.abs(enemy.y - player.y) < PLAYER_HEIGHT/3) {
        
        console.log("Collision!");
        
        player.x = PLAYER_START_X;
        player.y = PLAYER_START_Y;
    }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y < ROW_HEIGHT/6) {        
        player.x = PLAYER_START_X;
        player.y = PLAYER_START_Y;
        console.log("You won!");
    }

    // check if player hits bottom edge
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Remove/load enemies onto screen
var setEnemies = function(n) {
    // clear enemies array
    allEnemies = [];
    console.log(ROW_HEIGHT);

    // load new set of enemies
    for (var i = 0; i < n; i++) {
        // allEnemies.push(new Enemy(0, Math.random() * 184 + 50, Math.random() * 500 + 50));
        allEnemies.push(new Enemy(0, ENEMY_HEIGHTS[Math.floor(Math.random() * ENEMY_HEIGHTS.length)], Math.random() * 500 + 50));
     }
};

setEnemies(3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
