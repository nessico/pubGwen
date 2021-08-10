import { IOrder } from './../../shared/_models/shopModels/order';
import { BasketService } from './../../basket/basket.service';

import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { IBasket } from 'src/app/shared/_models/shopModels/basket';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket!);
    this.checkoutService.createOrder(orderToCreate).subscribe(
      <IOrder>(order: IOrder) => {
        this.toastr.success('Order was successful');
        this.basketService.deleteLocalBasket(basket!.id);
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      },
      (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    );
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')!
        .get('deliveryMethod')!.value,
      shipToAddress: this.checkoutForm.get('addressForm')!.value,
    };
  }
}
