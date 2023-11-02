import Vector2D from "./vector2D.js";
import Rope from "./rope.js";

let rope = [];
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");
let isMovingBob = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

let mousePos = {
    x: center.x,
    y: center.y
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createRope() {
    rope = new Rope(pen, center.x, 100, 30, 5, 0.05, {x: canvas.width, y: canvas.height});
    // rope.particles[0].locked = true;
}

function updateRope() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    rope.update();
    if (isMovingBob) {
        rope.particles[rope.particles.length - 1].position = new Vector2D(mousePos.x, mousePos.y);
        rope.particles[rope.particles.length - 1].velocity = new Vector2D(0, 0);
    }
    rope.show();
    requestAnimationFrame(updateRope);
}

document.onmousedown = (e) => {
    if (e.button == 0) {
        isMovingBob = true;
    }
}

document.onmousemove = (e) => {
    if (isMovingBob) {
        mousePos = {
            x: e.clientX,
            y: e.clientY
        }
        canvas.style.cursor = "grab";
    }
}

document.onmouseup = () => {
    canvas.style.cursor = "auto";
    isMovingBob = false;
}

createRope();
updateRope();