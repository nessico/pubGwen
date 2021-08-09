import { PresenceService } from './presence.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/_models/accountModels/user';
import { IAddress } from 'src/app/shared/_models/accountModels/address';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  // ReplaySubject is like a buffer object that stores the value in here and anytime
  //  a subscribers subscribes a observable, its gonna store the value in it
  // Alternative was Behavior Subject; However, BehaviorSubject won't dispatch the last emitted value after completion,
  //  but ReplaySubject can dispatch values to an observable even if your ReplaySubject is completed.
  // https://stackoverflow.com/questions/43118769/subject-vs-behaviorsubject-vs-replaysubject-in-angular

  constructor(private http: HttpClient, private presence: PresenceService) {}

  login(model: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', model).pipe(
      map((user: IUser) => {
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  // Persistence by setting token to local storage 
  //  then app component runs a method to get token from local storage on ngOnInit()
  setCurrentUser(user: IUser) {
    if (user == null) {
      this.currentUserSource.next(null!);
      return of(null!);
    }
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    return of(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  checkUserExists(username: string) {
    return this.http.get(
      this.baseUrl + 'account/userexists?username=' + username
    );
  }

  // Checkout Form
  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

  // For populating user's address if they already have a saved address
  getUserAddress() {
    return this.http.get(this.baseUrl + 'account/address');
  }
}
