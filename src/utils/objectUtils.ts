export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
}