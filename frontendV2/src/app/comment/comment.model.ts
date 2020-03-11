import { User } from "./../user/user.model";
export class Comment {
    id: number;
    commentText: string;
    timestamp: any;
    creator: User;

    constructor() {
        this.commentText = "";
        this.timestamp = "";
    }
}
