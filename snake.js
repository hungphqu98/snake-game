import { getInputDirection } from "./input.js";


const SNAKEBODY = [
    {x: 11, y: 11 }, 
]
let newSegments = 0;
export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = SNAKEBODY.length -2;i>=0; i--) {
        SNAKEBODY[i + 1] = {...SNAKEBODY[i]}
    }
    SNAKEBODY[0].x += inputDirection.x
    SNAKEBODY[0].y += inputDirection.y
}

export function draw(gameBoard) {
    SNAKEBODY.forEach(segment => {
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}
export function expandSnake(amount) {
    newSegments +=amount
}
export function onSnake(position, {ignoreHead = false} = {}) {
    return SNAKEBODY.some((segment,index) => {
        if (ignoreHead && index === 0) return false
        return equalPosition(segment,position)
    })
}
function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}
function addSegments() {
    for (let i=0; i< newSegments; i++) {
        SNAKEBODY.push({ ...SNAKEBODY[SNAKEBODY.length - 1 ] });
    }
    newSegments = 0
}
export function getSnakeHead() {
    return SNAKEBODY[0]
}
export function snakeIntersection() {
    return onSnake(SNAKEBODY[0], {ignoreHead: true})
}
