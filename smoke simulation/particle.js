function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Particle {
    constructor(pen, position) {
        this.position = position;
        this.position.x += getRndInteger(-20, 20);
        // this.position.y += getRndInteger (-10, 10);
        this.pen = pen;
        this.velocity = {
            x: getRndInteger(-15, 17) * 0.1,
            y: getRndInteger(-50, -1) * 0.1
        }
        this.alpha = 1;
        this.color = "rgba(255, 255, 0, 1)";
    }
    show() {
        this.pen.strokeStyle = "white";
        this.pen.fillStyle = this.color;
        this.pen.beginPath();
        this.pen.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        this.pen.fill();
        this.pen.lineWidth = 1;
        // this.pen.stroke()
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.alpha *= getRndInteger(0.980, 0.995);
        this.alpha = Math.max(this.alpha, 0.04);
        this.color = `rgba(255, ${255 - (this.alpha * 150)}, 0, ${this.alpha})`; // Adjust color based on alpha
        this.pen.globalAlpha = this.alpha;
        this.velocity.x += getRndInteger(-2, 2) * 0.01;
        if (this.globalAlpha < 0) {this.alpha = 0};
    }
}

function getRandomFireColor() {
    const fireColors = ['#FF4500', '#FFA500', '#FFD700', '#FF6347', '#FF8C00'];
    return fireColors[Math.floor(Math.random() * fireColors.length)];
}

export default Particle;