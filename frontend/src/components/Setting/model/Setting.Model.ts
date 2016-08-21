/// <reference path="../../Setting/model/Encryption.Model.ts" />

"use strict";

class Setting {

    sender: string;
    responseAdress: string;
    server: string;
    username: string;
    password: string;
    encryption: Encryption;
    port: number;
    connection: boolean;

    constructor() {
    }
}