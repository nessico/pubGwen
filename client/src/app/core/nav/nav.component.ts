import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/_models/accountModels/user';
import { AccountService } from '../../account/_accountServices/account.service';
import { IBasket } from 'src/app/shared/_models/shopModels/basket';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  basket$!: Observable<IBasket | null>;
  currentUser$!: Observable<IUser>;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
