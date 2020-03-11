/// <reference path="../User/model/User.Model.ts" />
/// <reference path="../../typeDefinitions/sjcl.d.ts" />
/// <reference path="../../typeDefinitions/Moment.d.ts" />

declare var jstz;

let findElementById = function (array: Array<any>, id: number): any {
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

let hasLicense = function (userLicense: any, routeLicense: String): boolean {
    if (isNullOrUndefined(userLicense) || isNullOrUndefined(routeLicense)) {
        return false;
    } else if (userLicense.package.indexOf(routeLicense) !== -1 && moment(userLicense.term, "DD.MM.YYYY").isAfter(moment(newTimestamp(), "DD.MM.YYYY"))) {
        return true;
    }
    return false;
};

let getNameOfUser = function (user: User): string {
    if (isNullOrUndefined(user)) {
        return "";
    }
    else if (!isNullOrUndefined(user.firstname) && user.firstname !== "" && !isNullOrUndefined(user.lastname) && user.lastname !== "") {
        return user.firstname + " " + user.lastname;
    }
    else {
        return user.email;
    }
};

let deepCopy = function (old: Object): any {
    if (isNullOrUndefined(old)) {
        return old;
    }
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

let newTimestamp = function (): string {
    let pattern: string = "DD.MM.YYYY HH:mm:ss:SSS";
    let timezone = jstz.determine().name();
    let date: any = moment.utc();
    // return date.tz(timezone).format(pattern);
    return date.format(pattern);
};

let toLocalDate = function (date: any, pattern: string = "DD.MM.YYYY HH:mm:ss"): string {
    let timezone = jstz.determine().name();
    let currentDateUtc: any = moment.utc(date, pattern);
    let currentDateLocal = currentDateUtc.tz(timezone);
    if (currentDateLocal.isDST()) {
        // currentDateLocal.add(-1, "h");
    }
    return currentDateLocal.format(pattern);
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

let sha256ToBase64 = function (text: string, iterations: number): string {
    if (isNullOrUndefined(text) || text === "") {
        return;
    }
    if (isNaN(iterations) || iterations <= 0) {
        iterations = 1;
    }
    let hash = btoa(text);
    for (let i = 0; i < iterations; i++) {
        hash = sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(atob(hash)));
    }
    return hash;
};

let hashPasswordSha256 = function (password: string): string {
    return sha256ToBase64(password, 10000);
};

let hashPasswordPbkdf2 = function (password: string, salt: string): string {
    return sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, salt, 10000));
};

/* tslint:disable */
let handleError = (error): void => {
    console.log(error);
};
/* tslint:enable */

let stringIsNullorEmpty = (text: string): boolean => {
    if (isNullOrUndefined(text)) {
        return true;
    }
    return text === "";
};

let b64toBlob = function (b64Data: string, contentType: string, sliceSize: number = 512): Blob {
    contentType = contentType || "";

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

let contains = function <T>(array: Array<T>, obj: T) {
    let i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
};

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        let x = String.fromCharCode as any;
        return x("0x" + p1);
    }));
}

function showConsistencyErrorMessage(error, translate, toaster, dataToTranslate) {
    let errorMessage = "";
    if (error.data != null && error.data.exception === "dash.exceptions.ConsistencyFailedException") {
        if (error.data.message !== null) {
            let splitAryMsg = error.data.message.split(";");
            if (splitAryMsg.length >= 1) {
                let editedBy = splitAryMsg[0];
                let editedAt = toLocalDate(moment(splitAryMsg[1], "x"));
                errorMessage = translate.instant("INCONSISTENCY_BY_AT_ERROR", { editedBy: editedBy, editedAt: editedAt, data: translate.instant(dataToTranslate) });
            } else {
                errorMessage = translate.instant("INCONSISTENCY_ERROR");
            }
        }
        toaster.pop("error", "", errorMessage);
        return errorMessage;
    }
    errorMessage = error == null || error.data == null ? translate.instant("SAVE_ERROR") : translate.instant("SAVE_ERROR") + ": " + error.data.message;
    toaster.pop("error", "", errorMessage);
    return errorMessage;
};

function getConsistencyErrorMessage(error, translate, dataToTranslate) {
    let errorMessage = "";
    if (error.data != null && error.data.exception === "dash.exceptions.ConsistencyFailedException") {
        if (error.data.message !== null) {
            let splitAryMsg = error.data.message.split(";");
            if (splitAryMsg.length >= 1) {
                let editedBy = splitAryMsg[0];
                let editedAt = toLocalDate(moment(splitAryMsg[1], "x"));
                errorMessage = translate.instant("INCONSISTENCY_BY_AT_ERROR", { editedBy: editedBy, editedAt: editedAt, data: translate.instant(dataToTranslate) });
            } else {
                errorMessage = translate.instant("INCONSISTENCY_ERROR");
            }
        }
        return errorMessage;
    }
    errorMessage = error == null || error.data == null ? translate.instant("SAVE_ERROR") : translate.instant("SAVE_ERROR") + ": " + error.data.message;
    return errorMessage;
};

function toastErrorMessage(error, toaster) {
    let errorMessage = error == null || error.data == null ? "Error:Unknown" : "Error: " + error.data.message;
    toaster.pop("error", "", errorMessage);
    return errorMessage;
};



