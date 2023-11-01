class Spring {
    constructor(pen, anchor, restLength, bob) {
        this.pen = pen;
        this.anchor = anchor;
        this.restLength = restLength;
        this.bob = bob;
        this.velocity = 0;
        this.k = 0.01;
    }
    update() {
        this.force = -this.k * (this.bob.y - (this.restLength + this.anchor.y));
        this.velocity += this.force;
        this.bob.y += this.velocity;
        this.velocity *= 0.98;
    }
    show() {
        this.pen.beginPath();
        this.pen.arc(this.anchor.x, this.anchor.y, 10, 0, 2 * Math.PI);
        this.pen.fill();
        this.pen.beginPath();
        this.pen.moveTo(this.anchor.x, this.anchor.y);
        this.pen.lineTo(this.bob.x, this.bob.y);
        this.pen.stroke();
        this.pen.beginPath();
        this.pen.arc(this.bob.x, this.bob.y, 15, 0, 2 * Math.PI);
        this.pen.fill();
    }
}

export default Spring;