declare var jwt_decode;

const TokenServiceId: string = "TokenService";

class TokenService {

    $inject = [$qId, $rootScopeId, $locationId];

    private accessToken: string | null;
    private accessTokenJson: any;
    private refreshToken: string | null;
    private refreshTokenJson: any;
    private loggedIn: boolean = false;

    constructor(private $q, private $rootScope, private $location) {
        this.initToken();
    }

    private async initToken(): Promise<void> {
        this.accessToken = localStorage.getItem("accessToken");
        this.refreshToken = localStorage.getItem("refreshToken");
        this.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
        this.refreshTokenJson = this.refreshToken == null ? null : jwt_decode(this.refreshToken);
        if (this.refreshToken == null || this.isExpired(this.refreshTokenJson)) {
            this.loggedIn = false;
        } else if (!this.isExpired(this.accessTokenJson)) {
            this.loggedIn = false;
        } else {
            let temp: { token: string } = await this.getAccessTokenByRefreshToken(this.refreshToken);
            this.accessToken = temp.token;
            localStorage.setItem("accessToken", this.accessToken);
            this.accessTokenJson = jwt_decode(this.accessToken);
            this.loggedIn = true;
        }
    }

    private async getAccessTokenByRefreshToken(refreshToken: string): Promise<{ token: string }> {
        let self = this;
        let defer = this.$q.defer();
        $.ajax({
            type: "GET",
            url: "/api/rest/auth/token",
            headers: { "X-Authorization": "Bearer " + refreshToken },
            success: (response: { token: string, refreshToken: string }) => {
                self.accessToken = response.token;
                self.accessTokenJson = this.accessToken == null ? null : jwt_decode(this.accessToken);
                localStorage.setItem("accessToken", self.accessToken);
                console.log(response);
                self.loggedIn = true;
                defer.resolve();
            },
            error: (error) => {
                self.loggedIn = false;
                console.log("refreshToken", error);
                // self.$location.path("/login");
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
                localStorage.setItem("accessToken", self.accessToken);
                localStorage.setItem("refreshToken", self.refreshToken);
                console.log(response);
                self.loggedIn = true;
                defer.resolve();
            },
            error: (error) => {
                self.loggedIn = false;
                console.log("setTokenByCredentials", error);
                // self.$location.path("/login");
                defer.reject(error);
            }
        });
        return defer.promise;
    }

    public async getAccessToken(): Promise<string> {
        try {
            if (this.accessToken != null && !this.isExpired(this.accessTokenJson)) { return this.accessToken; }
            if (this.refreshToken == null || this.isExpired(this.refreshTokenJson)) { throw Error("Refresh token expired!"); }

            let temp: { token: string } = await this.getAccessTokenByRefreshToken(this.refreshToken);
            this.accessToken = temp.token;
            localStorage.setItem("accessToken", this.accessToken);
            this.accessTokenJson = jwt_decode(this.accessToken);
            console.log(this.accessToken);
            this.loggedIn = true;
            return this.accessToken;

        } catch (error) {
            this.loggedIn = false;
            console.log("getAccessToken", error);
            // this.$location.path("/login");
        }

    }

    private isExpired(token: any): boolean {
        return token == null || token.exp * 1000 < new Date().getTime();
    }

    public logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        let port = this.$location.port();
        port = ":" + port;
        if (port !== ":8080") {
            port = "";
        }
        window.open("https://" + this.$location.host() + port + "/#/login", "_self");
    }

    public isLoggedIn(): boolean {
        console.log(this.loggedIn);
        return this.loggedIn;
    }

}
angular.module(moduleTokenService, []).service(TokenServiceId, TokenService);