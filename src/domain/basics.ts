interface Flavor<T> { __flavor?: T; }
type Flavored<K, T> = K & Flavor<T>;

type Vector2d = {
    x: number;
    y: number;
};

export function add(p1: Position, p2: Position): Position {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
    }
}

export function subtract(p1: Position, p2: Position): Position {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y,
    }
}

export function rotate(pos: Position, angle: number): Position {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        x: cos * pos.x - sin * pos.y,
        y: sin * pos.x + cos * pos.y,
    }
}

export function mult(velocity: Vector2d, time: number): Vector2d {
    return {
        x: velocity.x * time,
        y: velocity.y * time,
    }
}

export function rotateAround(position: Position, center: Position, angle: number) {
    const inRotationCenter = subtract(position, center);
    const rotated = rotate(inRotationCenter, angle);
    const newPosition = add(rotated, center);

    return newPosition;
}

export function getVector(magnitude: number, angle: number): Vector2d {
    return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
    };
}

export type Position = Flavored<Vector2d, "position">;

export type Placement = { position: Position } & { angle: number };
