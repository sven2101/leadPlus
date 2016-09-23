/// <reference path="../../Setting/model/Encryption.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />

"use strict";

class Smtp {

    id: number;
    sender: string;
    email: string;
    host: string;
    username: string;
    password: string;
    stringPassword: string;
    encryption: Encryption;
    port: number;
    connection: boolean;
    user: User;

    constructor() {
    }
}