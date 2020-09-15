import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'
let lastRenderTime = 0
let gameOver = 0;
let modal = document.getElementById('modal')
let gameOverModal = document.getElementById('gameOver')
let restartBtn = document.getElementById('again')
let easy = document.getElementById('easy')
let normal = document.getElementById('normal')
let hard = document.getElementById('hard')
let SNAKE_SPEED
easy.onclick = function() {
    modal.style.display = "none"
    chooseDifficulty(easy)
}

normal.onclick = function() {
    modal.style.display = "none"
    chooseDifficulty(normal)
}

hard.onclick = function() {
    modal.style.display = "none"
    chooseDifficulty(hard)
}
const gameBoard = document.getElementById('game-board')

function chooseDifficulty(difficulty) {
    switch (difficulty) {
        case easy:
            SNAKE_SPEED = 5;
            break;
        case normal:
            SNAKE_SPEED = 8;
            break;
        case hard:
            SNAKE_SPEED = 12;
            break;
    }
    
}

function main(currentTime) {
    if (gameOver) {
        gameOverModal.style.display = "block"
        restartBtn.onclick = function() {
            location.reload()
        }
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime;

    update()
    draw()
}
window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

