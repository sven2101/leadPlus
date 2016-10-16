/// <reference path="../common/model/AbstractModel.Model.ts" />
/// <reference path="../User/model/User.Model.ts" />

/// <reference path="../../typeDefinitions/Moment.d.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/
"use strict";

let findElementById = function (array: Array<AbstractModel>, id: Number): AbstractModel {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return array[i];
        }
    }
    return null;
};

let isNullOrUndefined = function (object: any): boolean {
    return object === null || typeof object === "undefined";
};

let getNameOfUser = function (user: User): string {
    if (!isNullOrUndefined(user.firstname) && user.firstname !== "" && !isNullOrUndefined(user.lastname) && user.lastname !== "") {
        return user.firstname + " " + user.lastname;
    }
    else {
        return user.username;
    }

};

let deepCopy = function (old: Object): any {
    return JSON.parse(JSON.stringify(old));
};

let shallowCopy = function (oldObject: Object, newObject: Object) {
    for (let propertyName in oldObject) {
        newObject[propertyName] = oldObject[propertyName];
    }
    if (!isNullOrUndefined(oldObject["id"])) {
        newObject["id"] = oldObject["id"];
    }
};

let newTimestamp = function (pattern: string = "DD.MM.YYYY HH:mm") {
    return moment.utc().format(pattern);
};

let toLocalDate = function (date: any, pattern: string = "DD.MM.YYYY HH:mm") {
    return moment(moment.utc(date, pattern)).local().format(pattern);
};

let partial = function (func: any, []) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        let allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
};

let size = function (obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};

let escapeHtmlBrackets = function (html: string): string {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

let unescapeHtmlBrackets = function (html: string): string {
    return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};

let unescapeHtmlQuote = function (html: string): string {
    return html.replace(/&quot;/g, "'");
};




