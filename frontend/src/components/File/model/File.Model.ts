/// <reference path="../../common/model/AbstractModel.Model.ts" />

"use strict";

class FileUpload extends AbstractModel {

    name: string;
    mimeType: string;
    size: number;
    description: number;
    deactivated: boolean;
    content: Array<any>;

    constructor() {
        super();
    }
}