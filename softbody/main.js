import Vector2D from "./vector2D.js";
import SoftBody2D from "./softbody.js";

let body = [];
let isMovingParticle = false;
let particleClosestToMouse = [];
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");
const gravity = new Vector2D(0, 0.08);


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

let mousePos = new Vector2D(center.x, center.y);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createSoftBody() {
    const position = {
        x: center.x - 100,
        y: 10
    }
    body = new SoftBody2D(pen, position.x, position.y);
    body.pointsH = 4;
    body.pointsV = 4;
    body.spacing = 50;
    body.bounds = {x: canvas.width - 16, y: canvas.height - 16};
    // body.debugMode = true;
    body.createGeometry();
}


function updateSoftBody() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    body.update();
    body.particles.forEach((y) => {
        y.forEach((particle) => {
            particle.applyGravity(gravity);
        })
    })
    if (isMovingParticle == true && particleClosestToMouse !== null) {
        particleClosestToMouse.velocity = new Vector2D(0, 0);
        particleClosestToMouse.position = new Vector2D(mousePos.x, mousePos.y);
    }
    body.show();
    requestAnimationFrame(updateSoftBody);
}

function getParticleCloseToMouse() {
    const maxDistance = 50;
    let smallestDistance = Infinity;
    let closestParticle = null;
    body.particles.forEach((row) => {
        row.forEach((particle) => {
            const distanceToParticle = mousePos.distance(particle.position);
            if (distanceToParticle < maxDistance && distanceToParticle < smallestDistance) {
                smallestDistance = distanceToParticle;
                closestParticle = particle;
            }
        })
    })
    particleClosestToMouse = closestParticle;
}


function setMousePosition(x, y) {
    mousePos.x = x;
    mousePos.y = y;
}

function handleGrabParticle(x, y) {
    isMovingParticle = true;
    setMousePosition(x, y);
    getParticleCloseToMouse();
}

function moveParticle(x, y) {
    setMousePosition(x, y);
    canvas.style.cursor = "grab";
}

document.onmousedown = (e) => {
    if (e.button == 0) {
        handleGrabParticle(e.clientX, e.clientY);
    }
}


document.onmousemove = (e) => {
    if (isMovingParticle) {
        moveParticle(e.clientX, e.clientY);
    }
}

document.ontouchstart = (e) => {
    handleGrabParticle(e.touches[0].clientX, e.touches[0].clientY);
}

document.ontouchmove = (e) => {
    if (isMovingParticle) {
        moveParticle(e.touches[0].clientX, e.touches[0].clientY);
    }
}

document.ontouchend = () => {
    isMovingParticle = false;
}

document.onmouseup = () => {
    particleClosestToMouse = null;
    canvas.style.cursor = "auto";
    isMovingParticle = false;
}

createSoftBody();
updateSoftBody();