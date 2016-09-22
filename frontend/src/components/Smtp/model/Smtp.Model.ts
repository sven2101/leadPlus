/// <reference path="../../Setting/model/Encryption.Model.ts" />

"use strict";

class Smtp {

    sender: string;
    email: string;
    host: string;
    username: string;
    password: string;
    encryption: Encryption;
    port: number;
    connection: boolean;
    user: User;

    constructor() {
    }
}