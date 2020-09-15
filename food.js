import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
let food = getRandomPosition()
let foodList = ['assets/giraffe.png','assets/lion.png','assets/kangaroo.png'];
let foodImg = foodList[Math.floor(Math.random() * 3)]
const EXPANSION_RATE = 1
export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        foodImg = foodList[Math.floor(Math.random() * 3)]
        food = getRandomPosition()
        
    }
    
}

export function draw(gameBoard) {
        const foodElement = document.createElement("div")
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        // foodImg = foodList[Math.floor(Math.random() * 3)]
        foodElement.style.backgroundImage = 'url(' + foodImg + ')'
        gameBoard.appendChild(foodElement)
        
}

function getRandomPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}