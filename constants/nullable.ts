export type Nullable<T extends unknown> = T | null;

export const isNullable = <T>(value: Nullable<T>): value is null => {
    return value === null;
};

export const isNotNullable = <T>(value: Nullable<T>): value is T => {
    return value !== null;
};
