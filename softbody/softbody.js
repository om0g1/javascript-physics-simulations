import Vector2D from "./vector2D.js";
import Particle2D from "./particle2D.js";
import Spring from "./spring.js";

const neighborParticleMatrix = [
                                [-1,-1],[0, -1],[1, -1],
                                [-1, 0],[0,  0],[1,  0],
                                [-1, 1],[0,  1],[1,  1]
                                ]

class SoftBody2D {
    constructor(pen, x, y) {
        this.pen = pen;
        this.position = new Vector2D(x, y);
        this.pointsH = 3;
        this.pointsV = 3;
        this.spacing = 100;
        this.particles = [];
        this.springs = [];
        this.structuralSprings = [];
        this.bounds = {
            x: Infinity,
            y: Infinity
        };
        this.elasticity = 0.0199;;
        this.debugMode = false;
        this.repulsionStrength = 0.55; //0.95
        this.createGeometry();
    }
    checkParticleNeighbours(x, y) {
        let neighbours = [];
        neighborParticleMatrix.forEach((neighbour, index) => {
            if (index !== 4) {
                const xIndex = x + neighbour[0];
                const yIndex = y + neighbour[1];
                if  (yIndex > -1 && xIndex > -1 && yIndex < this.particles.length && xIndex < this.particles[y].length) {
                    neighbours.push(this.particles[yIndex][xIndex]);
                }
            }
        })
        return neighbours;
    }
    createGeometry() {
        this.particles = [];
        this.springs = [];
        for (let y = 0; y < this.pointsV; y++) {
            this.particles[y] = [];
            for (let x = 0; x < this.pointsH; x++) {
                this.particles[y].push(new Particle2D(this.pen, this.position.x + (x * this.spacing), this.position.y + (y * this.spacing), 1, false, this.bounds));
            }
        }
        for (let y = 0; y < this.particles.length; y++) {
            for (let x = 0; x < this.particles[y].length; x++) {
                const a = this.particles[y][x];
                const neighbours = this.checkParticleNeighbours(x, y);
                neighbours.forEach((particle) => {
                    const spring = new Spring(this.pen, a, particle, this.elasticity);
                    this.springs.push(spring);
                })
            }
        }
    }
    createLinearParticlesArray() {
        let particles = [];
        this.particles.forEach((row) => {
            row.forEach((particle) => {
                particles.push(particle);
            })
        })
        return particles;
    }
    applyRepulsion() {
        const minDistance = this.spacing * 0.12; //0.22
        const particles = this.createLinearParticlesArray();
        particles.forEach((particle) => {
            particles.forEach((neighbour) => {
                if (particle !== neighbour) {
                    const distance = neighbour.position.copy().subtract(particle.position).magnitude();
                    if (distance < minDistance && distance !== 0) {
                        const forceDirection = neighbour.position.copy().subtract(particle.position).normalize();
                        const forceMagnitude = (minDistance - distance) * this.repulsionStrength;
                        const force = forceDirection.scalarMultiply(forceMagnitude);
                        particle.applyForce(force);
                        particle.reflect(neighbour);
                    }
                }
            })
        }) 
    }
    update() {
        this.applyRepulsion();
        this.springs.forEach((spring) => {
            spring.update();
        })
    }
    drawGeometry() {
        const lastX = this.particles[0].length - 1;
        const lastY = this.particles.length - 1;
        this.pen.beginPath();
        for (let x = 0; x < lastX; x++) {
            const particlePosition = this.particles[0][x].position;
            if (x == 0) {
                this.pen.moveTo(particlePosition.x, particlePosition.y);
            } else {
                this.pen.lineTo(particlePosition.x, particlePosition.y);
            }
        }
        for (let y = 0; y < lastY; y++) {
            const particlePosition = this.particles[y][lastX].position;
            this.pen.lineTo(particlePosition.x, particlePosition.y);
        }
        for (let x = lastX; x > -1; x--) {
            const particlePosition = this.particles[lastY][x].position;
            this.pen.lineTo(particlePosition.x, particlePosition.y);
        }
        for (let y = lastY; y > -1; y--) {
            const particlePosition = this.particles[y][0].position;
            this.pen.lineTo(particlePosition.x, particlePosition.y);
        }
        this.pen.fillStyle = "#00a4eb";
        this.pen.fill();
        this.pen.stroke();
    }
    show() {
        if (this.debugMode) {
            this.springs.forEach((spring) => {
                spring.show();
            })
            this.particles.forEach((y) => {
                y.forEach((particle) => {
                    particle.show();
                })
            })
        } else {
            this.drawGeometry();
        }
        
    }
}

export default SoftBody2D;