/// <reference path="../../Common/model/Promise.Interface.ts" />
interface IDefer<T> {
    promise: Promise<T>;
    resolve: (T) => Promise<T>;
    reject: (T) => Promise<T>;

}