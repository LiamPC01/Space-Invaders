const defaultEnemies = [
    {
        x: 200,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 250,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 300,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 350,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 200,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 250,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 300,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 350,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    }

];

let enemies = [
    {
        x: 200,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 250,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 300,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 350,
        y: 40,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 200,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 250,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 300,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    },
    {
        x: 350,
        y: 90,
        goingRight: false,
        speed: 0.5,
        destroyed: false
    }

];

var player = {
    x: 200,
    y: 350,
    bulletX: 200,
    bulletY: 315,
    isPlayerShooting: false,
    paused: false,
    win: false,
    score: 0
};

function setup() {
    createCanvas(400, 400);

}

function draw() {
    background(0);
    checkGameEnd();
    enemyMovement();
    drawPlayer();
    playerMovement();
    playerShoot();
    hitDetection();
    drawEnemies();
    printScore();
}

function checkGameEnd() {
    if (enemies.length == 0) {
        player.paused = true;
        player.win = true;
        newGame();
    }
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].y >= 300) {
            player.paused = true;
            player.win = false;
            newGame();
        }
    }

}

function newGame() {
    if (player.win == true) {
        fill(0, 255, 0);
        textSize(50);
        text("YOU WIN!", 80, 200);
        fill(255, 255, 255);
        textSize(25);
        text("PRESS UP ARROW", 90, 250);
    } else if (player.win == false) {
        fill(255, 0, 0);
        textSize(50);
        text("GAME OVER", 50, 200);
        fill(255, 255, 255);
        textSize(25);
        text("PRESS UP ARROW", 90, 250);
    }
    if (keyIsDown(UP_ARROW)) {
        player.paused = false;
        enemies = structuredClone(defaultEnemies);
        if (player.win == false) {
            player.score = 0;
        }

    }

}

function drawPlayer() {
    rectMode(CENTER);
    fill(0, 200, 0);
    rect(player.x, player.y, 50, 50,);
}

function playerMovement() {
    if (keyIsDown(LEFT_ARROW) && player.x > 25) {
        player.x -= 3;
    } else if (keyIsDown(RIGHT_ARROW) && player.x < 375) {
        player.x += 3;
    }
}

function playerShoot() {
    if (keyIsDown(32) && player.isPlayerShooting == false) {
        player.bulletY = player.y - 35; // -35 to playerShoot above player
        player.bulletX = player.x;
        player.isPlayerShooting = true;
    }
    if (player.isPlayerShooting == true) {
        fill(0, 200, 0);
        rect(player.bulletX, player.bulletY, 5, 20);
        if (player.bulletY >= 0) {
            player.bulletY -= 4; // bullet speed
        } else {
            player.isPlayerShooting = false;
        }
    }

}

function hitDetection() {
    for (let i = 0; i < enemies.length; i++) {
        if (dist(player.bulletX, player.bulletY, enemies[i].x, enemies[i].y) < 25) {
            destroyEnemy(i);
            player.bulletY = player.y - 35; // -35 to playerShoot above player
            player.bulletX = player.x;
            player.isPlayerShooting = false;

        }
    }
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].destroyed == false) {
            fill(200, 0, 0);
            rect(enemies[i].x, enemies[i].y, 50, 50);
        }
    }
}

function enemyMovement() {
    if (player.paused == false) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].destroyed == false) {
                if (!enemies[i].goingRight) {
                    enemies[i].x -= enemies[i].speed;
                }
                if (enemies[i].x <= 25) {
                    enemies.forEach(enemyLeftMoveDown);
                }
                if (enemies[i].goingRight) {
                    enemies[i].x += enemies[i].speed;
                }
                if (enemies[i].x >= 375) {
                    enemies.forEach(enemyRightMoveDown);
                }
            }
        }
    }

}

function enemyLeftMoveDown() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += 50 / enemies.length; // 50 / enemies.length as this block of code is executed foreach() enemy
        enemies[i].goingRight = true;
    }
}

function enemyRightMoveDown() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += 50 / enemies.length;
        enemies[i].goingRight = false;
    }
}

function destroyEnemy(enemyIndex) {
    enemies[enemyIndex].destroyed = true;
    enemies.splice(enemyIndex, 1);
    player.score += 1;
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].speed += 0.2;
    }
}

function printScore() {
    fill(255, 255, 255);
    textSize(25);
    let scoreText = "Score: " + player.score;
    text(scoreText, 0, 25);
}






