/// <reference path="../../common/model/AbstractModel.Model.ts" />

"use strict";

class FileUpload extends AbstractModel {

    filename: string;
    mimeType: string;
    size: number;

    content: Array<any>;

    constructor() {
        super();
    }
}