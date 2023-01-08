export const shallowCompare = <T extends Record<string, any>>(obj1: T, obj2: T) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(
        (key: string) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    )