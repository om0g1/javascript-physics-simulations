import Spring from "./spring.js";
import Particle2D from "./particle2D.js";
import Vector2D from "./vector2D.js";

class Rope {
    constructor(pen, x, y, springNo, springLength, k, bounds) {
        this.pen = pen;
        this.position = new Vector2D(x, y);
        this.springNo = springNo;
        this.particles = [];
        this.springs = [];
        this.springLength = springLength;
        this.k = k;
        this.bounds = bounds;
        this.createSprings();
    }
    createSprings() {
        for (let i = 0; i < this.springNo; i++) {
            this.particles[i] = new Particle2D(this.pen, this.position.x, this.position.y + i * this.springLength, 0.4, false, this.bounds);
            if (i !== 0) {
                let a = this.particles[i - 1];
                let b = this.particles[i];
                const spring = new Spring(this.pen, a, this.springLength, b, this.k);
                this.springs.push(spring);
            }
        }
    }
    update() {
        this.springs.forEach((spring) => {
            spring.update();
        })
    }
    show() {
        this.springs.forEach((spring) => {
            spring.show();
        })
    }
}

export default Rope;