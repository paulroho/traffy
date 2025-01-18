interface Flavor<T> { __flavor?: T; }
type Flavored<K, T> = K & Flavor<T>;

export type Vector2d = {
    x: number;
    y: number;
};

export type Matrix2x2 = {
    e11: number,
    e12: number,
    e21: number,
    e22: number,
};

export type Position = Flavored<Vector2d, "position">;

export type Placement = Position & { angle: number };

export type Size = {
    width: number,
    height: number,
}
export type Section = {
    start: number,
    length: number,
};

export type WorldPosition = {
    east: number,
    north: number,
};

export type WorldSize = {
    westEast: number,
    southNorth: number,
}

export type WorldExtent = {
    westSouthCorner: WorldPosition,
    size: WorldSize,
}

export type PlacedVector = {
    from: Position,
    vector: Vector2d,
    length: number
};

export type MetaStateItem = (Position | PlacedVector) & { info: string };

export function add(pos: Position, vect: Vector2d): Position {
    return {
        x: pos.x + vect.x,
        y: pos.y + vect.y,
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

export function mult(vect: Vector2d, fact: number): Vector2d {
    return {
        x: vect.x * fact,
        y: vect.y * fact,
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

export function distance(p1: Position, p2: Position): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function getOrthogonalVector(vector: Vector2d): Vector2d {
    return {
        x: -vector.y,
        y: vector.x
    };
}

export function vectorWithLength(vector: Vector2d, length: number): Vector2d {
    const factor = length / magnitude(vector);
    return {
        x: vector.x * factor,
        y: vector.y * factor,
    };
}

export function magnitude(vector: Vector2d): number {
    return Math.sqrt(
        vector.x * vector.x +
        vector.y * vector.y
    );
}

export function invert(mat: Matrix2x2): Matrix2x2 {
    const det: number = determinant(mat);
    return {
        e11: mat.e22 / det, e12: -mat.e12 / det,
        e21: -mat.e21 / det, e22: mat.e11 / det,
    };
}

function determinant(mat: Matrix2x2): number {
    return mat.e11 * mat.e22 - mat.e12 * mat.e21;
}

export function matrixMult(mat: Matrix2x2, vect: Vector2d): Vector2d {
    return {
        x: mat.e11 * vect.x + mat.e12 * vect.y,
        y: mat.e21 * vect.x + mat.e22 * vect.y,
    };
}

export function isPoint(item: MetaStateItem): item is Position & { info: string } {
    return (item as Position).x !== undefined;
}
