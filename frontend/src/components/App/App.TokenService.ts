declare var jwt_decode;

const TokenServiceId: string = "TokenService";

const ACCESS_TOKEN: string = "accessToken";
const REFRESH_TOKEN: string = "refreshToken";
const USER_STORAGE: string = "user";

class TokenService {

    $inject = [$qId, $rootScopeId, $locationId];

    private accessToken: string | null;
    private accessTokenJson: any;
    private refreshToken: string | null;
    private refreshTokenJson: any;
    private loggedIn: boolean = false;
    private initPromise: Promise<void>;

    constructor(private $q, private $rootScope, private $location) {
        this.init();
    }

    private async init(): Promise<void> {
        this.initPromise = this.initToken();
    }

    private async initToken(): Promise<void> {
        console.log("init start", this.loggedIn);
        this.accessToken = localStorage.getItem(ACCESS_TOKEN);
        this.refreshToken = localStorage.getItem(REFRESH_TOKEN);
        this.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
        this.refreshTokenJson = this.refreshToken == null ? null : jwt_decode(this.refreshToken);
        if (this.isExpired(this.refreshTokenJson)) {
            this.loggedIn = false;
            console.log("refreshToken expired");
            this.logout(false);
        } else if (!this.isExpired(this.accessTokenJson)) {
            this.loggedIn = true;
        } else {
            console.log("accessToken expired");
            let temp: string = await this.getAccessToken();
            console.log(temp);
            this.accessToken = temp;
            localStorage.setItem(ACCESS_TOKEN, this.accessToken);
            this.accessTokenJson = jwt_decode(this.accessToken);
            this.loggedIn = true;
        }
        console.log("init end", this.loggedIn);
    }

    private async getAccessTokenByRefreshToken(refreshToken: string): Promise<{ token: string }> {
        let self = this;
        let defer = this.$q.defer();
        $.ajax({
            type: "GET",
            url: "/api/rest/auth/token",
            headers: { "X-Authorization": "Bearer " + refreshToken },
            success: (response: { token: string, refreshToken: string }) => {
                defer.resolve(response);
            },
            error: (error) => {
                defer.reject(error);
            }
        });
        return defer.promise;
    }

    public setTokenByCredentials(credentials: { username: string, password: string }): Promise<void> {
        let self = this;
        let defer = this.$q.defer();
        console.log(credentials);
        $.ajax({
            type: "POST",
            url: "/api/rest/auth/login",
            data: JSON.stringify(credentials),
            contentType: "application/json; charset=utf-8",
            success: (response: { token: string, refreshToken: string }) => {
                self.accessToken = response.token;
                self.refreshToken = response.refreshToken;
                self.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
                self.refreshTokenJson = this.refreshToken == null ? null : jwt_decode(this.refreshToken);
                localStorage.setItem(ACCESS_TOKEN, self.accessToken);
                localStorage.setItem(REFRESH_TOKEN, self.refreshToken);
                console.log(response);
                self.loggedIn = true;
                defer.resolve();
            },
            error: (error) => {
                self.loggedIn = false;
                console.log("setTokenByCredentials", error);
                defer.reject(error);
            }
        });
        return defer.promise;
    }

    public async getAccessToken(): Promise<string> {
        try {
            if (this.accessToken != null && !this.isExpired(this.accessTokenJson)) { return this.accessToken; }
            if (this.refreshToken == null || this.isExpired(this.refreshTokenJson)) { throw Error("Refresh token expired!"); }

            console.log("refresh");
            let temp: { token: string } = await this.getAccessTokenByRefreshToken(this.refreshToken);
            console.log(temp);
            this.accessToken = temp.token;
            localStorage.setItem(ACCESS_TOKEN, this.accessToken);
            this.accessTokenJson = jwt_decode(this.accessToken);
            console.log(this.accessToken);
            this.loggedIn = true;
            return this.accessToken;

        } catch (error) {
            this.loggedIn = false;
            console.log("getAccessToken", error);
            this.logout();
        }

    }

    public getAccessTokenInstant(): string {
        try {
            if (this.accessToken != null && !this.isExpired(this.accessTokenJson)) { return this.accessToken; }
            if (this.refreshToken == null || this.isExpired(this.refreshTokenJson)) { throw Error("Refresh token expired!"); }

            this.refreshAccessToken();
            return this.refreshToken;

        } catch (error) {
            this.loggedIn = false;
            console.log("getAccessToken", error);
            this.logout();
        }

    }
    private async refreshAccessToken(): Promise<void> {
        try {
            let temp = await this.getAccessTokenByRefreshToken(this.refreshToken);
            this.accessToken = temp.token;
            localStorage.setItem(ACCESS_TOKEN, this.accessToken);
            this.accessTokenJson = jwt_decode(this.accessToken);
            this.loggedIn = true;
        } catch (error) {
            this.loggedIn = false;
            console.log("refreshAccessToken", error);
            this.logout();
        }
    }


    private isExpired(token: any): boolean {
        return token == null || token.exp * 1000 < new Date().getTime();
    }

    public logout(fullPageReload: boolean = true) {
        console.log("logout");
        this.loggedIn = false;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(USER_STORAGE);
        // this.$rootScope.user = undefined;
        let port = this.$location.port();
        port = ":" + port;
        if (port !== ":8080") {
            port = "";
        }
        console.log(this.$location.path());
        if (fullPageReload === true) {
            window.open("https://" + this.$location.host() + port + "/", "_self");
        } else if (fullPageReload === false) {
            this.$location.path("/login");
        }
        console.log("exit");
    }

    public isLoggedIn(): boolean {
        console.log(this.loggedIn);
        return this.loggedIn;
    }

    public async awaitInit(): Promise<void> {
        await this.initPromise;
    }

}
angular.module(moduleTokenService, []).service(TokenServiceId, TokenService);