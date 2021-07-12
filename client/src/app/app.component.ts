import { Component, OnInit } from '@angular/core';
import { User } from './shared/_models/employeeModels/user';
import { environment } from 'src/environments/environment';
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


  constructor(
    private accountService: AccountService,
    private presence: PresenceService,
  ) {}
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}
