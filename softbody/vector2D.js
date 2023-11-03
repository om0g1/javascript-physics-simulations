class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    vectorMultiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }
    scalarMultiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    normalize() {
        let mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    }
    distance(vector) {
        return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2);
    }
    copy() {
        return new Vector2D(this.x, this.y);
    }
}

export default Vector2D;