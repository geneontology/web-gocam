import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {

    authenticated: boolean = false;

    constructor() { }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    //for test purpose only
    setIsAuthenticated(isAuth: boolean) {
        this.authenticated = isAuth;
    }

}