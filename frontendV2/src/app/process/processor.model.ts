import { Common } from "./../common/common";
import { User } from "./../user/user.model";
import { Activity } from "./activity.enum";


export class Processor {
    user: User;
    activity: Activity;
    timestamp: string;

    constructor(user: User = undefined, activity: Activity = undefined) {
        this.user = user;
        this.activity = activity;
        this.timestamp = Common.newTimestamp();
    }
}
