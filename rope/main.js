import Vector2D from "./vector2D.js";
import Particle2D from "./particle2D.js";
import Spring from "./spring.js";

let rope = [];
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");
let spring = {};
let isMovingBob = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createSpring() {
    const anchor = new Particle2D(pen, center.x, 200, 1);
    const bob = new Particle2D(pen, center.x, 400, 1);
    spring = new Spring(pen, anchor, 200, bob);
}

function updateSpring() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    if (!isMovingBob) {spring.update();}
    spring.show();
    requestAnimationFrame(updateSpring);
}

document.onmousemove = (e) => {
    if (e.buttons == 1) {
        spring.velocity = new Vector2D(0, 0);
        spring.bob.position.x = e.clientX;
        spring.bob.position.y = e.clientY;
        isMovingBob = true;
        canvas.style.cursor = "grab";
    }
}

document.onmouseup = () => {
    canvas.style.cursor = "auto";
    isMovingBob = false;
}

createSpring();
updateSpring();