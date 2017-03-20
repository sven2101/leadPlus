/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../model/Attachment.Model.ts" />


const NotificationServiceId: string = "NotificationService";
const broadcastUserNotificationShouldChange: string = "userNotificationShouldChange";

class NotificationService {

    private $inject = [toasterId, $translateId, $rootScopeId, NotificationResourceId, $qId, TokenServiceId];

    toaster;
    translate;
    rootScope;
    notificationResource;
    formdata;
    fileReader;
    notification: Notification;
    q;
    userNotifications: Array<Notification> = [];

    constructor(toaster, $translate, $rootScope, NotificationResource, $q, private TokenService: TokenService) {
        this.notificationResource = NotificationResource.resource;
        this.toaster = toaster;
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.q = $q;
        this.formdata = new FormData();
        this.fileReader = new FileReader();
        this.notification = new Notification();
        let broadcastUserNotificationShouldChangeListener = $rootScope.$on(broadcastUserNotificationShouldChange, (event, result) => {
            this.refreshUserNotifications();
        });
    }

    async sendNotification(notification: Notification, process: Process): Promise<Notification> {
        try {
            this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.SENDING);
            let sendNotification: Notification = await this.notificationResource.sendNotification({ processId: process.id, senderId: this.rootScope.user.id }, { smtpKey: this.TokenService.getSmtpKey(), notification: notification }).$promise;

            this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.SUCCESS);
            setTimeout(() => {
                this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.DEFAULT);
            }, 1000 * 60);
            // this.toaster.pop("success", "", this.translate.instant("NOTIICATION_SEND"));
            return sendNotification;
        } catch (error) {
            this.toaster.pop("error", "", this.translate.instant("NOTIICATION_SEND_ERROR"));
            this.rootScope.$broadcast(broadcastSetNotificationSendState, NotificationSendState.ERROR);
            throw error;
        } finally {
            this.rootScope.$broadcast(broadcastUserNotificationShouldChange);
        }

    }

    async getNotificationsBySenderId(senderId: number): Promise<Array<Notification>> {
        return this.notificationResource.getNotificationsBySenderId({ senderId: senderId }).$promise;
    }

    async refreshUserNotifications(): Promise<void> {
        this.userNotifications = await this.getNotificationsBySenderId(this.rootScope.user.id);
        this.rootScope.$broadcast(broadcastUserNotificationChanged, [this.userNotifications]);

    }

}

angular.module(moduleNotificationService, [ngResourceId]).service(NotificationServiceId, NotificationService);