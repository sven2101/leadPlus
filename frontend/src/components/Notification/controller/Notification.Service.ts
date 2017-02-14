/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../model/Attachment.Model.ts" />

declare var Ladda;

const NotificationServiceId: string = "NotificationService";

class NotificationService {

    private $inject = [toasterId, $translateId, $rootScopeId, NotificationResourceId, $qId];

    toaster;
    translate;
    rootScope;
    notificationResource;
    formdata;
    fileReader;
    notification: Notification;
    q;
    userNotifications: Array<Notification> = [];

    constructor(toaster, $translate, $rootScope, NotificationResource, $q) {
        this.notificationResource = NotificationResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.q = $q;
        this.formdata = new FormData();
        this.fileReader = new FileReader();
        this.notification = new Notification();
    }

    async sendNotification(notification: Notification, process: Process): Promise<Notification> {


        try {
            let sendNotification: Notification = await this.notificationResource.sendNotification({ processId: process.id, senderId: this.rootScope.user.id }, { smtpKey: this.rootScope.user.smtpKey, notification: notification }).$promise;
            this.toaster.pop("success", "", this.translate.instant("NOTIICATION_SEND"));
            return sendNotification;
        } catch (error) {
            console.log(error);
            this.toaster.pop("error", "", this.translate.instant("NOTIICATION_SEND_ERROR"));
            throw error;
        }



    }

    async getNotificationsBySenderId(senderId: number): Promise<Array<Notification>> {
        return this.notificationResource.getNotificationsBySenderId({ senderId: this.rootScope.user.id }).$promise;
    }

    async refreshUserNotifications(): Promise<void> {
        this.userNotifications = await this.getNotificationsBySenderId(this.rootScope.user.id);
    }

}

angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);