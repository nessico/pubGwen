import { ToastrService } from 'ngx-toastr';
import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/_models/shopModels/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  basket$!: Observable<IBasket | null>;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe(
      (response: any) => {
        this.toastr.success('Payment intent created');
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    );
  }
}
