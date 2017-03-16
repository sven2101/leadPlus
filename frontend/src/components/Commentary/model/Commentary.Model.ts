/// <reference path="../../User/model/User.Model.ts" />

class Commentary {
    id: number;
    commentText: string;
    timestamp: any;
    creator: User;

    constructor() {
        this.commentText = "";
        this.timestamp = "";
    }

}
