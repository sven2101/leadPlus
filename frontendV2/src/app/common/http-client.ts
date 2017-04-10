import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { AuthenticationService } from "../login/authentication.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class HttpClient {

    constructor(private http: Http, private AuthenticationService: AuthenticationService) { }

    private async setAuthorizationHeader(requestOptions: RequestOptions): Promise<void> {
        const accessToken = await this.AuthenticationService.getAccessTokenPromise();
        requestOptions.headers.append("X-Authorization", "Bearer  " + accessToken);
    }

    private getRequestOptions(hasBody: boolean = false): RequestOptions {
        const headers = new Headers(AuthenticationService.JSON_HEADER);
        const options = hasBody ? new RequestOptions({ headers: headers, withCredentials: true })
            : new RequestOptions({ headers: headers, body: "" });
        return options;
    }

    public async get<T>(url: string, requestOptions: RequestOptions | undefined = undefined): Promise<T> {
        requestOptions = requestOptions == null ? this.getRequestOptions() : requestOptions;
        await this.setAuthorizationHeader(requestOptions);
        return this.http.get(AuthenticationService.API_ENPOINT + url, requestOptions)
            .map((res: Response) => this.extractResponse(res))
            .toPromise()
            .catch(error => this.extractErrorResponse(error));
    }

    public async post<T>(url: string, data: Object, requestOptions: RequestOptions | undefined = undefined): Promise<T> {
        requestOptions = requestOptions == null ? this.getRequestOptions(true) : requestOptions;
        await this.setAuthorizationHeader(requestOptions);
        return this.http.post(AuthenticationService.API_ENPOINT + url, data, requestOptions)
            .map((res: Response) => this.extractResponse(res))
            .toPromise()
            .catch(error => this.extractErrorResponse(error));
    }

    public async put<T>(url: string, data: Object, requestOptions: RequestOptions | undefined = undefined): Promise<T> {
        requestOptions = requestOptions == null ? this.getRequestOptions(true) : requestOptions;
        await this.setAuthorizationHeader(requestOptions);
        return this.http.post(AuthenticationService.API_ENPOINT + url, data, requestOptions)
            .map((res: Response) => this.extractResponse(res))
            .toPromise()
            .catch(error => this.extractErrorResponse(error));
    }

    public async delete<T>(url: string, requestOptions: RequestOptions | undefined = undefined): Promise<T> {
        requestOptions = requestOptions == null ? this.getRequestOptions() : requestOptions;
        await this.setAuthorizationHeader(requestOptions);
        return this.http.delete(AuthenticationService.API_ENPOINT + url, requestOptions)
            .map((res: Response) => this.extractResponse(res))
            .toPromise()
            .catch(error => this.extractErrorResponse(error));
    }

    public async getWithoutAuth<T>(url: string, requestOptions: RequestOptions | undefined = undefined): Promise<T> {
        requestOptions = requestOptions == null ? this.getRequestOptions() : requestOptions;
        return this.http.get(AuthenticationService.API_ENPOINT + url, requestOptions)
            .map((res: Response) => this.extractResponse(res))
            .toPromise()
            .catch(error => this.extractErrorResponse(error));
    }

    public async postWithoutAuth<T>(url: string, data: Object, requestOptions: RequestOptions | undefined = undefined): Promise<T> {
        requestOptions = requestOptions == null ? this.getRequestOptions(true) : requestOptions;
        return this.http.post(AuthenticationService.API_ENPOINT + url, data, requestOptions)
            .map((res: Response) => this.extractResponse(res))
            .toPromise()
            .catch(error => this.extractErrorResponse(error));
    }

    private extractResponse(res: Response): any {
        if ((<any>res)._body === "") { return; }
        return res.json();
    }

    private extractErrorResponse(error: any): void {
        if (error.status === 401) {
            this.AuthenticationService.logout();
            return;
        }
        throw error;
    }
}
