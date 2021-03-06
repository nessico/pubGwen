import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMember } from 'src/app/shared/_models/accountModels/member';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/shared/_models/accountModels/pagination';
import { UserParams } from 'src/app/shared/_models/accountModels/userParams';
import { AccountService } from './account.service';
import { IUser } from 'src/app/shared/_models/accountModels/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: IMember[] = [];
  memberCache = new Map();
  user!: IUser;
  userParams!: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  // https://valor-software.com/ngx-bootstrap/pagination
  // Passed pagination parameters from paginatedResult
  getMembers(userParams: UserParams) {
    // Caching with map, by passing in user params,
    // If users is identical to cache, then it will go into our cache instead of ai
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(
      userParams.pageIndex,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    // Observing will get the response back and we will have to get the body ourselves with pipe
    // Observing response -> passed the params -> passed into a pipe -> specify our response mapping
    // Caching at map
    return getPaginatedResult<IMember[]>(
      this.baseUrl + 'users',
      params,
      this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    // Spread operator
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: IMember) => member.username === username);

    if (member) {
      return of(member);
    }
    return this.http.get<IMember>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: IMember) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageIndex: any, pageSize: any) {
    let params = getPaginationHeaders(pageIndex, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<IMember[]>>(
      this.baseUrl + 'likes',
      params,
      this.http
    );
  }
}
