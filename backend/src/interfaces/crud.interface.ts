interface ICreate<T> {
    create(data: T | Partial<T>): any;
}

interface ICrud<T> extends ICreate<T> {
    update(data: T | Partial<T>): any;
    delete(data: T | Partial<T>): any;
    view(data: T | Partial<T>): any;
}

export type {ICreate, ICrud}