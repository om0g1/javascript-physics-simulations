import Vector2D from "./vector2D.js";

class Spring {
    constructor(pen, anchor, restLength, bob) {
        this.pen = pen;
        this.anchor = anchor;
        this.restLength = restLength;
        this.bob = bob;
        this.velocity = new Vector2D(0, 0);
        this.k = 0.01;
        this.gravity = new Vector2D(0, 1);
        this.displacement = 0;
        this.force = new Vector2D(0, 0);
    }
    getForceAndDisplacement() {
        const bobPosition = this.bob.position; 
        this.force = new Vector2D(bobPosition.x, bobPosition.y);
        this.force.subtract(this.anchor.position);
        this.displacement = this.force.magnitude() - this.restLength;
        this.force.normalize().scalarMultiply((-1 * this.k * this.displacement));
    }
    stretchSpringLine() {
        this.getForceAndDisplacement();
        const lineRestWidth = 5;
        const shrinkRatio = 0.005;
        this.pen.lineWidth = lineRestWidth - (this.displacement * shrinkRatio);
        
        const anchorPosition = this.anchor.position;
        const bobPosition = this.bob.position;
        this.pen.beginPath();
        this.pen.moveTo(anchorPosition.x, anchorPosition.y);
        this.pen.lineTo(bobPosition.x, bobPosition.y);
        this.pen.stroke();
    }
    update() {
        this.getForceAndDisplacement();
        this.velocity.add(this.force);
        this.velocity.add(this.gravity);
        this.bob.position.add(this.velocity);
        this.velocity.scalarMultiply(0.98);
    }
    show() {
        this.pen.fillStyle = "#C0C0C0";
        this.stretchSpringLine();
        this.pen.fillStyle = "#808080";
        this.anchor.show();
        this.pen.fillStyle = "#00a4eb";
        this.bob.show();
    }
}

export default Spring;