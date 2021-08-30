import { CdkStepper } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/_models/shopModels/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  basket$!: Observable<IBasket | null>;
  @Input() stepNext!: CdkStepper;

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
        this.stepNext.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
