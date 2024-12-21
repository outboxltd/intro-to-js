// משתנים גלובליים למשחק
let gameStarted = false;
let gameLoop;
let birdPosition = 250;
let birdVelocity = 0;
let score = 0;
let obstacles = [];

// קבועים של המשחק
const GRAVITY = 0.25;       // הקטנת כוח המשיכה לנפילה איטית יותר
const JUMP_FORCE = -7;      // הקטנת כוח הקפיצה להתאמה לנפילה האיטית
const OBSTACLE_SPEED = 3;
const OBSTACLE_INTERVAL = 2500;
const INITIAL_OBSTACLE_POSITION = 500;

// השגת אלמנטים מה-HTML
const bird = document.getElementById('bird');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// פונקציה לקפיצת הציפור
function jump() {
    if (gameStarted) {
        birdVelocity = JUMP_FORCE;
    } else {
        startGame();
    }
}

// פונקציה להתחלת המשחק
function startGame() {
    startScreen.classList.add('hidden');
    gameStarted = true;

    birdPosition = 250;
    birdVelocity = 0;
    score = 0;
    obstacles = [];
    scoreElement.textContent = '0';

    gameLoop = setInterval(updateGame, 20);
    setTimeout(createObstacle, 1000);
    setInterval(createObstacle, OBSTACLE_INTERVAL);
}

// פונקציה ליצירת מכשול חדש
function createObstacle() {
    if (!gameStarted) return;

    const gap = 200;
    const gapStart = Math.random() * (400 - gap);

    const topObstacle = document.createElement('div');
    topObstacle.className = 'obstacle';
    topObstacle.style.height = gapStart + 'px';
    gameArea.appendChild(topObstacle);

    const bottomObstacle = document.createElement('div');
    bottomObstacle.className = 'obstacle';
    bottomObstacle.style.height = (600 - gapStart - gap) + 'px';
    bottomObstacle.style.bottom = '0';
    gameArea.appendChild(bottomObstacle);

    obstacles.push({
        top: topObstacle,
        bottom: bottomObstacle,
        passed: false,
        x: INITIAL_OBSTACLE_POSITION
    });
}

// פונקציה לעדכון מצב המשחק
function updateGame() {
    if (!gameStarted) return;

    birdVelocity += GRAVITY;
    birdPosition += birdVelocity;
    bird.style.top = birdPosition + 'px';

    if (birdPosition < 0 || birdPosition > 560) {
        endGame();
        return;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= OBSTACLE_SPEED;

        obstacle.top.style.right = obstacle.x + 'px';
        obstacle.bottom.style.right = obstacle.x + 'px';

        if (checkCollision(obstacle)) {
            endGame();
            return;
        }

        if (!obstacle.passed && obstacle.x < 50) {
            obstacle.passed = true;
            score++;
            scoreElement.textContent = score;
        }

        if (obstacle.x < -60) {
            gameArea.removeChild(obstacle.top);
            gameArea.removeChild(obstacle.bottom);
            obstacles.splice(i, 1);
        }
    }
}

// פונקציה לבדיקת התנגשות
function checkCollision(obstacle) {
    const birdRect = bird.getBoundingClientRect();
    const topRect = obstacle.top.getBoundingClientRect();
    const bottomRect = obstacle.bottom.getBoundingClientRect();

    return (
        birdRect.right > topRect.left &&
        birdRect.left < topRect.right && (
            birdRect.top < topRect.bottom ||
            birdRect.bottom > bottomRect.top
        )
    );
}

// פונקציה לסיום המשחק
function endGame() {
    gameStarted = false;
    clearInterval(gameLoop);

    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;

    obstacles.forEach(obstacle => {
        gameArea.removeChild(obstacle.top);
        gameArea.removeChild(obstacle.bottom);
    });
    obstacles = [];
}

// פונקציה להתחלה מחדש
function restart() {
    gameOverScreen.classList.add('hidden');
    startGame();
}

// הוספת מאזיני אירועים למקלדת ומסך מגע
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    }
});

document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    jump();
});

document.addEventListener('mousedown', function(event) {
    event.preventDefault();
    jump();
});

restartButton.addEventListener('click', restart);

// עדכון הרוטציה של הציפור
function updateBirdRotation() {
    const rotation = birdVelocity * 2;
    bird.style.transform = `rotate(${rotation}deg)`;
}

setInterval(updateBirdRotation, 20);
