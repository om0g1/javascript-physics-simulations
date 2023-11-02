import Vector2D from "./vector2D.js";

const twicePI = 2 * Math.PI;

class Particle2D {
    constructor(pen, x, y, mass) {
        this.pen = pen;
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.mass = mass;
    }
    show() {
        this.pen.beginPath();
        this.pen.arc(this.position.x, this.position.y, 16, 0, twicePI);
        this.pen.fill();
    }
}

export default Particle2D;