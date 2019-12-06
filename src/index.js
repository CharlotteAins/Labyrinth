'use strict';

const ctx = document.getElementById("canvas").getContext("2d");

const background_image = document.getElementById("background");
const person_image = document.getElementById("person");

const cell = 64;
let x = 6;
let y = 6;
let person_x = () => cell * x;
let person_y = () => cell * y - 5;
let currentDirection = "Up";

const positions = {
    Left: 1,
    Down: 2,
    Right: 3,
    Up: 4,
};

const room = [
    [5, 5, 5, 5, 5, 5, 5, 5],
    [5, 0, 4, 0, 0, 2, 0, 5],
    [5, 0, 5, 0, 5, 0, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 5],
    [5, 4, 0, 2, 0, 0, 4, 5],
    [5, 2, 5, 5, 5, 2, 5, 5],
    [5, 0, 5, 0, 0, 0, 2, 5],
    [5, 5, 5, 5, 5, 5, 5, 5],
];

function background() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            ctx.drawImage(background_image, cell * room[row][column], 0, cell, cell,
                cell * column, cell * row, cell, cell);
        }
    }
}

function person(direction) {
    currentDirection = direction;
    ctx.drawImage(person_image, 0, cell * positions[direction], cell, cell,
        person_x(), person_y(), cell, cell);
}

function loop() {
    background();
    person("Down");
}

loop();

function isWall() {
    return room[y][x] === 5;
}

document.addEventListener("keydown", function (event) {
    background();
    switch (event.code) {
        case "ArrowUp":
            y--;
            isWall() && y++;
            person("Up");
            break;
        case "ArrowDown":
            y++;
            isWall() && y--;
            person("Down");
            break;
        case "ArrowLeft":
            x--;
            isWall() && x++;
            person("Left");
            break;
        case "ArrowRight":
            x++;
            isWall() && x--;
            person("Right");
            break;
        default :
            loop();
            break;
    }

});

let idInterval;

const autoMoveBtn = document.getElementById("start");
const stopMoveBtn = document.getElementById("stop");

stopMoveBtn.addEventListener("click", function () {
    clearInterval(idInterval);
});

autoMoveBtn.addEventListener("click", function () {
    clearInterval(idInterval);
    idInterval = setInterval(() => {
        let e = new Event("keydown");
        e.code = `Arrow${currentDirection}`;
        const Xbefore = x;
        const Ybefore = y;
        document.dispatchEvent(e)
        if(Xbefore === x && Ybefore === y) {
            let numDirection = positions[currentDirection] + 1;
            if(numDirection === 5) {
                numDirection = 1;
            }
            for(let key in positions) {
                if(positions[key] === numDirection) {
                    e.code = `Arrow${key}`
                }
            }
            document.dispatchEvent(e);
        }
    }, 1000);
});