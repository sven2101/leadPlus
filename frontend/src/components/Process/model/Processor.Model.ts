/// <reference path="../../Process/model/Activity.Enum.ts" />

class Processor {
    user: User;
    activity: Activity;
    timestamp: string;

    constructor(user: User = undefined, activity: Activity = undefined) {
        this.user = user;
        this.activity = activity;
        this.timestamp = newTimestamp();
    }
}