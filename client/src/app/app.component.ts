import { BasketService } from './basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { User } from './shared/_models/employeeModels/user';
import { environment } from 'src/environments/environment';
import { AccountService } from './employee/employeeServices/account.service';
import { PresenceService } from './employee/employeeServices/presence.service';

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
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
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
