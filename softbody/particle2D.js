import Vector2D from "./vector2D.js";

const twicePI = 2 * Math.PI;

class Particle2D {
    constructor(pen, x, y, mass, locked, bounds) {
        this.pen = pen;
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.mass = mass;
        this.locked = (locked === true) ? true : false;
        this.bounds = bounds;
    }
    checkBounds() {
        if (this.position.x <= 0) {this.position.x = 0}
        else if (this.position.x >= this.bounds.x) {this.position.x = this.bounds.x}
        if (this.position.y <= 0) {this.position.y = 0}
        else if (this.position.y >= this.bounds.y) {this.position.y = this.bounds.y;} 
    }
    applyForce(force) {
        if(!this.locked){
            this.checkBounds();
            this.velocity.add(force);
            this.position.add(this.velocity);
            this.velocity.scalarMultiply(0.98);
        }
    }
    reflect(particle) {
        const normal = particle.position.copy().subtract(this.position).normalize();
        this.velocity = this.velocity.subtract(normal.scalarMultiply(2 * this.velocity.dot(normal)));
    }
    applyGravity(gravity) {
        const weight = gravity.scalarMultiply(this.mass);
        this.velocity.add(weight);
    }
    show() {
        this.pen.beginPath();
        this.pen.arc(this.position.x, this.position.y, 16, 0, twicePI);
        this.pen.fill();
        // return true;
    }
}

export default Particle2D;