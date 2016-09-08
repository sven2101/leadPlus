interface IPromise<T> {
    then(callback: (result: T) => any);
}