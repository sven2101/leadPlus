/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Profile/controller/Profile.Service.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />
/// <reference path="../../App/App.Common.ts" />
/// <reference path="../../Smtp/controller/Smtp.Service.ts" />
/// <reference path="../../Smtp/model/SmtpEncryptionType.ts" />


const ProfileControllerId: string = "ProfileController";

class ProfileController {

    private $inject = [ProfileServiceId, $rootScopeId, $scopeId, toasterId, $translateId, $routeId];

    myImage = "";
    myCroppedImage = "";
    profileService: ProfileService;
    rootscope;
    scope;
    route;
    lastRoute;


    passwordForm;

    currentUser: User;
    oldPassword: string;
    newPassword1: string;
    newPassword2: string;
    currentTab: string;
    smtpForm;
    SmtpEncryptionType: Object = SmtpEncryptionType;
    testingSmtp: boolean = false;

    constructor(ProfileService: ProfileService, $rootScope, $scope, private SmtpService: SmtpService, private toaster, private $translate, $route) {
        this.profileService = ProfileService;
        this.rootscope = $rootScope;
        this.currentUser = deepCopy(this.rootscope.user);
        this.scope = $scope;
        this.route = $route;
        this.getById();
        this.internalRouting($route);
        let self = this;
        let profileImageSaved = $rootScope.$on("profileImageSaved", function (evt, data: FileUpload) {
            if (!isNullOrUndefined(data)) {
                let user = deepCopy(self.rootscope.user);
                user.picture = data[0];
                user.thumbnail = data[1];
                self.updateProfileImage(user);
            }
        });
        $scope.$on("$destroy", function handler() {
            profileImageSaved();
        });
    }

    internalRouting(route: any) {
        let paramTab = route.current.params.tab;
        if (!isNullOrUndefined(paramTab)) {
            this.currentTab = paramTab;
        } else {
            this.tabOnClick("information");
            route.updateParams({
                tab: this.currentTab
            });
        }
        let self = this;
        self.lastRoute = route.current;
        self.scope.$on("$locationChangeSuccess", function (event) {
            if (self.lastRoute.$$route && route.current.$$route && self.lastRoute.$$route.originalPath === route.current.$$route.originalPath) {
                if (route.current.params && isNullOrUndefined(route.current.params.tab)) {
                    route.updateParams({
                        tab: self.currentTab
                    });
                }
                route.current = self.lastRoute;
            }
        });
    }

    tabOnClick(tab: string) {
        this.lastRoute = this.route.current;
        this.currentTab = tab;
    }

    async testSmtpConnection() {
        this.testingSmtp = true;
        try {
            await this.SmtpService.test();
        } finally {
            this.testingSmtp = false;
        }

    }

    saveSmtpConnection() {
        try {
            this.SmtpService.save();
            this.toaster.pop("success", "", this.$translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE"));
        } catch (error) {
            this.toaster.pop("error", "", this.$translate.instant("SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR"));
            throw error;
        }

    }

    saveProfileImage() {
        this.rootscope.$broadcast("saveCroppedImage");
    }

    updateProfilInfo() {
        this.profileService.updateProfilInfo(this.currentUser).then((result) => this.currentUser = result, (error) => { this.reduceCurrentUserInfo(); });
    }

    reduceCurrentUserInfo() {
        this.currentUser.email = this.rootscope.user.email;
        this.currentUser.firstname = this.rootscope.user.firstname;
        this.currentUser.lastname = this.rootscope.user.lastname;
        this.currentUser.phone = this.rootscope.user.phone;
        this.currentUser.language = this.rootscope.user.language;
        this.currentUser.skype = this.rootscope.user.skype;
        this.currentUser.job = this.rootscope.user.job;
        this.currentUser.fax = this.rootscope.user.fax;
        this.currentUser.defaultVat = this.rootscope.user.defaultVat;
    }

    updateProfileImage(user: User) {
        this.profileService.updateProfileImage(user);
    }

    updatePassword() {
        this.profileService.updatePassword(this.oldPassword, this.newPassword1, this.newPassword2).then((result) => {
            this.passwordForm.$setPristine();
            this.clearPasswordForm();
        }, (error) => {
            handleError(error);
            /*
            this.passwordForm.$setPristine();
            this.clearPasswordForm();
            */
        });
    }

    clearPasswordForm() {
        this.oldPassword = "";
        this.newPassword1 = "";
        this.newPassword2 = "";
    }

    uploadFiles() {
        this.profileService.uploadFiles();
    }

    getById() {
        this.profileService.getById().then((result) => this.currentUser = result, (error) => handleError(error));
    }

    getTheFiles($files) {
        this.profileService.getTheFiles($files);
    }
}

angular.module(moduleProfile, [ngResourceId]).controller(ProfileControllerId, ProfileController);
