
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './shared/_models/user';

import { environment } from 'src/environments/environment';
import { IProduct } from './shared/_models/product';
import { IProductPagination } from './shared/_models/productPagination';
import { AccountService } from './employee/_services/account.service';
import { PresenceService } from './employee/_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Gwen';
  users: any;
  baseUrl = environment.apiUrl;
  products!: IProduct[];

  constructor(
    private accountService: AccountService,
    private presence: PresenceService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.setCurrentUser();
    // this.http
    //   .get<IProductPagination>(
    //     'https://localhost:5001/api/products?pageSize=50'
    //   )
    //   .subscribe(
    //     (response: IProductPagination) => {
    //       this.products = response.data;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}
