import { Role } from "./role.enum";
import { Language } from "./language.enum";
import { FileUpload } from "../file-upload/file-upload.model";

export class User {
    id: number;
    username: string;
    email: string;
    role: Role;
    picture: FileUpload;
    thumbnail: FileUpload;
    language: Language;
    enabled: boolean;
    firstname: string;
    lastname: string;
    phone: string;
    mobile: string;
    skype: string;
    fax: string;
    job: string;
    defaultVat: number;
    defaultBCC: number;
    defaultCC: number;
    authorization: string;

    constructor() {
    }
}
