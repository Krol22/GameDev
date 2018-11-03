export class Vector2d {

    constructor(
        public x: number,
        public y: number
    ) { }

    add(vector: Vector2d) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector: Vector2d) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    mul(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    static magnitude(vectorA: Vector2d, vectorB: Vector2d): number {
        return Math.sqrt(
            (Math.pow(vectorB.x - vectorA.x, 2) + Math.pow(vectorB.y - vectorA.y, 2))
        );
    }

    static scalar(vectorA: Vector2d, vectorB: Vector2d): number {
        return vectorA.x * vectorB.x + vectorA.y + vectorB.y;
    }
}
