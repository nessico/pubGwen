import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/_models/employeeModels/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(
      this.baseUrl + 'admin/users-with-roles'
    );
  }

  //?roles is for query string
  updateUserRoles(username: any, roles: any[]) {
    return this.http.post(
      this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles,
      {}
    );
  }
}
