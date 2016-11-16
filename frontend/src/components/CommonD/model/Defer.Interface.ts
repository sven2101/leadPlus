/// <reference path="../../Common/model/Promise.Interface.ts" />
interface IDefer<T> {
    promise: IPromise<T>;
    resolve: (T) => IPromise<T>;
    reject: (T) => IPromise<T>;

}