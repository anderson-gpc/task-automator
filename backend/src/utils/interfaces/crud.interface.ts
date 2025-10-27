interface ICreate<T, R> {
    create(data: Omit<T, "id">): Promise<R | void>;
}

interface ICrud<T, R> extends ICreate<T, R> {
    update(data: Omit<T, "id"> | Partial<T>): Promise<T>;
    delete(data: T | Partial<T>): Promise<boolean>;
    view(data: T | Partial<T>): Promise<T | null>;
}

export type {ICreate, ICrud}
