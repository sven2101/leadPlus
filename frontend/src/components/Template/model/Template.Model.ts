/// <reference path="../../Setting/model/Encryption.Model.ts" />
/// <reference path="../../Common/model/AbstractModel.Model.ts" />

"use strict";

class Template extends AbstractModel {

    name: string;
    description: string;
    content: string;
    deactivated: boolean;

    constructor() {
        super();
    }
}