import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
    idToken: string,
    email:	string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    errors: any = {
        'EMAIL_EXISTS': () => { return 'This email exists already' },
        'OPERATION_NOT_ALLOWED': () => { return 'Operation not allowed' },
        'TOO_MANY_ATTEMPTS_TRY_LATER': () => { return 'Too many attempts, try later' }
    }

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_Key}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError((errorRes: any) => this.handleError(errorRes)),
            tap( resData => this.handleAuthentication(resData))

        )
    }


    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.api_Key}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError((errorRes: any) => this.handleError(errorRes)),
            tap( resData => this.handleAuthentication(resData))
        )
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }

    private handleAuthentication(resData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate)
        this.user.next(user)
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        let message = 'An unknown error occurred!';
        if(this.errors[errorRes?.error?.error?.message]()) {
            message = this.errors[errorRes?.error?.error?.message]()
        }
        return throwError(() => new Error(message))
    }

}

