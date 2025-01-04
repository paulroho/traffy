interface Flavor<T> { __flavor?: T; }
type Flavored<K, T> = K & Flavor<T>;

type Vector2d = {
    x: number;
    y: number;
};

export type Position = Flavored<Vector2d, "position">;

