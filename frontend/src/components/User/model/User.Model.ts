/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />
/// <reference path="Role.Model.ts" />
/// <reference path="Language.Model.ts" />

class User {

    id: number;
    username: string;
    email: string;
    role: Role;
    picture: FileUpload;
    language: Language;
    enabled: boolean;
    firstname: string;
    lastname: string;
    phone: string;
    skype: string;
    fax: string;
    job: string;
    defaultVat: number;
    authorization: string;

    constructor() {
    }
}