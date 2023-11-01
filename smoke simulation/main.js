import Particle from "./particle.js";

let particles = [];
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

let mousePos = {
    x: center.x,
    y: canvas.height - 200
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createParticle() {
    let particle = new Particle(pen, {x: mousePos.x, y: mousePos.y});
    particles.push(particle);
    setTimeout(() => {
        createParticle();
    }, getRndInteger(1, 20));
}

function drawParticles() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        if (particle.alpha < 0.04) particles.splice(index, 1);
        if (particle.position.y < 0) particles.splice(index, 1);
        particle.update();
        particle.show();
    })
    console.log(particles.length);
    requestAnimationFrame(drawParticles);
}

// document.onmousemove = (e) => {
//     mousePos.x = e.clientX;
//     mousePos.y = e.clientY;
// }

createParticle();
drawParticles();