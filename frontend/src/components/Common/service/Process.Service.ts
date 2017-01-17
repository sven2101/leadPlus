/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/
"use strict";

const ProcessServiceId: string = "ProcessService";

class ProcessService {

    private $inject = [ProcessResourceId, toasterId, $rootScopeId, $translateId];

    processResource: any;
    toaster: any;
    rootScope: any;
    translate: any;

    constructor(ProcessResource, toaster, $rootScope, $translate) {
        this.processResource = ProcessResource.resource;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }

    async save(editProcess: Process): Promise<Process> {
        let self = this;
        let resultProcess = await this.processResource.save(editProcess).$promise.catch(error => handleError(error)) as Process;
        self.rootScope.$broadcast("updateRow", resultProcess);
        if (!isNullOrUndefined(editProcess.processor) && editProcess.processor.id === Number(self.rootScope.user.id)) {
            self.rootScope.$broadcast("onTodosChange");
        }
        return resultProcess;
    }
}
angular.module(moduleProcessService, [ngResourceId]).service(ProcessServiceId, ProcessService);
