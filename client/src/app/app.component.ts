import { BasketService } from './basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from './shared/_models/accountModels/user';
import { environment } from 'src/environments/environment';
import { AccountService } from './account/_accountServices/account.service';
import { PresenceService } from './account/_accountServices/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Gwen';
  users: any;
  baseUrl = environment.apiUrl;

  constructor(
    private accountService: AccountService,
    private presence: PresenceService,
    private basketService: BasketService
  ) {}
  ngOnInit() {
    this.setCurrentUser();
    this.setCurrentBasket();
  }

  //user persistence
  setCurrentUser() {
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
    if (user == null) {
      this.accountService.setCurrentUser(null!);
    }
  }

  //basket persistence
  setCurrentBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('Initialized basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
