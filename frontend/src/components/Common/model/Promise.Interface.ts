interface IPromise<T> {
    then(callback: (result: T) => any, error?: (result: T) => any);
}