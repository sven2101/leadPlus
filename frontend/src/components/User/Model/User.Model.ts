/// <reference path="../../common/model/AbstractModel.Model.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />

/// <reference path="Role.Model.ts" />
/// <reference path="Language.Model.ts" />

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

class User extends AbstractModel {

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

    constructor() {
        super();
    }
}