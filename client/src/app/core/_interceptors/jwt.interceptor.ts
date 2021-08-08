import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../../account/_accountServices/account.service';
import { IUser } from '../../shared/_models/accountModels/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}
  // Sends token to server by default instead of adding it manually in every HTTP request with an HttpInterceptor
  // Authorization header with Bearer token so server will authenticate us
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser!: IUser;

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }

  // Alternative way is to get token from local storage with localStorage.getItem('token') 
  // Instead of pipe & subscribe with accountService 
}
