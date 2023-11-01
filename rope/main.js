// import Particle from "./particle.js";
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
    spring = new Spring(pen, {x: center.x, y: 200}, 200, {x: center.x, y: 330});
    console.log(spring.anchor);
}

function updateSpring() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    if (!isMovingBob) {spring.update();}
    spring.show();
    requestAnimationFrame(updateSpring);
}

document.onmousemove = (e) => {
    if (e.buttons == 1) {
        spring.velocity = 0;
        spring.bob = {
            x: center.x,
            y: e.clientY
        }
        isMovingBob = true;
    }
}

document.onmouseup = () => {
    isMovingBob = false;
}

createSpring();
updateSpring();