/// <reference path="../../Setting/model/Encryption.Model.ts" />

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