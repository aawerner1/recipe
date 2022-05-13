import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user: any) => {
              if (!user) {
                return next.handle(req);
              }
              const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
              });
              return next.handle(modifiedReq);
            })
          );

    }

}