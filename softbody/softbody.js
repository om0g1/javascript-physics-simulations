import Vector2D from "./vector2D.js";
import Particle2D from "./particle2D.js";
import Spring from "./spring.js";

class SoftBody2D {
    constructor(pen, x, y, width, height, elasticity, bounds) {
        this.pen = pen;
        this.position = new Vector2D(x, y);
        this.width = width;
        this.height = height;
        this.particles = [];
        this.springs = [];
        this.bounds = bounds;
        this.k = elasticity;
        this.createGeometry();
    }
    createGeometry() {
        this.particles.push(new Particle2D(this.pen, this.position.x, this.position.y, 1, false, this.bounds));
        this.particles.push(new Particle2D(this.pen, this.position.x + this.width, this.position.y, 1, false, this.bounds));
        this.particles.push(new Particle2D(this.pen, this.position.x + this.width, this.position.y + this.height, 1, false, this.bounds));
        this.particles.push(new Particle2D(this.pen, this.position.x, this.position.y + this.height, 1, false, this.bounds));
        this.particles.forEach((particle, index) => {
            for (let i = 0; i < this.particles.length; i++) {
                if (index !== i) {
                    const b = this.particles[i];
                    const spring = new Spring(this.pen, this.particles[index], this.width, b, this.k);
                    this.springs.push(spring);
                }
            }
        })
        // console.log(this.springs);
    }
    update() {
        this.springs.forEach((spring) => {
            spring.update();
        })
    }
    show() {
        // this.particles.forEach((particle) => {
        //     particle.show();
        // })
        this.springs.forEach((spring) => {
            spring.show();
        })
    }
}

export default SoftBody2D;