import Vector2D from "./vector2D.js";
import Rope from "./rope.js";
import SoftBody2D from "./softbody.js";

let body = [];
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

function createSoftBody() {
    body = new SoftBody2D(pen, center.x - 150, 100, 300, 300, 0.01, {x: canvas.width - 16, y: canvas.height - 16});
}

function updateSoftBody() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    body.update();
    // if (isMovingBob) {
    //     rope.particles[rope.particles.length - 1].position = new Vector2D(mousePos.x, mousePos.y);
    //     rope.particles[rope.particles.length - 1].velocity = new Vector2D(0, 0);
    // }
    body.show();
    requestAnimationFrame(updateSoftBody);
}

// document.onmousedown = (e) => {
//     if (e.button == 0) {
//         isMovingBob = true;
//     }
// }

// document.onmousemove = (e) => {
//     if (isMovingBob) {
//         mousePos = {
//             x: e.clientX,
//             y: e.clientY
//         }
//         canvas.style.cursor = "grab";
//     }
// }

// document.onmouseup = () => {
//     canvas.style.cursor = "auto";
//     isMovingBob = false;
// }

createSoftBody();
updateSoftBody();