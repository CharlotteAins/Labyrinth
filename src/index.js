'use strict';

const ctx = document.getElementById("canvas").getContext("2d");

ctx.fillStyle = "rgb(123,23,43, 0.2)";
ctx.fillRect(0, 0, 512, 512);

const background_image = document.getElementById("background");
const person_image = document.getElementById("person");

const cell = 64;
let x = 1;
let y = 6;
let person_x = () => cell * x;
let person_y = () => cell * y - 5;
const positions = {
    Up: 4,
    Down: 2,
    Left: 1,
    Right: 3,
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
    ctx.drawImage(person_image, 0, cell * positions[direction], cell, cell,
        person_x(), person_y(), cell, cell);
}

function loop() {
    background();
    person("Down");
}

loop();

