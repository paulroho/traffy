interface Flavor<T> { __flavor?: T; }
type Flavored<K, T> = K & Flavor<T>;

type Vector2d = {
    x: number;
    y: number;
};

export type Position = Flavored<Vector2d, "position">;

export type Velocity2d = Flavored<Vector2d, "velocity">;
