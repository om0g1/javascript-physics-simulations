import Vector2D from "./vector2D.js";

const twicePI = 2 * Math.PI;

class Particle2D {
    constructor(pen, x, y, mass, locked, bounds) {
        this.pen = pen;
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.mass = mass;
        this.gravity = new Vector2D(0, 0.08);
        this.weight = this.gravity.copy().scalarMultiply(mass);
        this.locked = (locked === true) ? true : false;
        this.bounds = bounds;
    }
    checkBounds() {
        if (this.position.x < 0) {this.position.x = 0}
        else if (this.position.x > this.bounds.x) {this.position.x = this.bounds.x}
        if (this.position.y < 0) {this.position.y = 0}
        else if (this.position.y > this.bounds.y) {this.position.y = this.bounds.y;} 
    }
    applyForce(force) {
        if(!this.locked){
            this.checkBounds();
            this.velocity.add(force);
            this.position.add(this.velocity);
            this.velocity.add(this.weight);
            this.velocity.scalarMultiply(0.98);
        }
    }
    show() {
        this.pen.beginPath();
        this.pen.arc(this.position.x, this.position.y, 10, 0, twicePI);
        this.pen.fill();
    }
}

export default Particle2D;