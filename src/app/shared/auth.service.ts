import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';


@Injectable()
export class AuthService {

    authenticated: boolean = false;

    constructor(private httpClient: HttpClient) { }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    //for test purpose only
    setIsAuthenticated(isAuth: boolean) {
        this.authenticated = isAuth;
    }

    feedbackURL: string = "https://r6dfpgyvx6.execute-api.us-east-1.amazonaws.com/prod/contact-us";
    feedbackKey: string = "lfP5Ix50YV2sYgCgecRRx44grBvYvdZ26xuHIoXO";
    sendFeedback(type: string, email: string, feedback: string) {

        let options = {
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": this.feedbackKey
            }
        }

        let body = {
            "email": email,
            "feedbackon": type,
            "feedback": feedback
        };

        this.httpClient.post(this.feedbackURL, body, options)

            .subscribe(response => {
                console.log(response);
            })
    }

}