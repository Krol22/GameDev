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

    static findAngle(p0: Vector2d, p1: Vector2d, p2: Vector2d): number {
        let a = Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2);
        let b = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        let c = Math.pow(p2.x - p0.x, 2) + Math.pow(p2.y - p0.y, 2);

        let angle = Math.acos((a + b - c) / Math.sqrt(4 * a * b));

        if (p0.y > p1.y) {
            angle = 2 * Math.PI - angle;
        }
        return angle;
    }
}
