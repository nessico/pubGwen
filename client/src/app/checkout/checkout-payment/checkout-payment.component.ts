import { BasketService } from './../../basket/basket.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { IBasket } from 'src/app/shared/_models/shopModels/basket';

declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm!: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement!: ElementRef;
  // Initialize stripe elements to type(any) because Stripe is javascript based
  // https://stripe.com/docs/stripe-js
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;

  constructor(
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngAfterViewInit(): void {
    // use Publishable key (safe to include)
    this.stripe = Stripe(
      'pk_test_51JSDN6LsvArkcsyVYjVIWu93DPnLLtp1hMKRGZohR3W8i6eEF88Ng6hewshCchb0ikRZboa6PkITi7yQZO3KWh8s00rXweoLwu'
    );
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket!);
    this.checkoutService.createOrder(orderToCreate).subscribe(
      <IOrder>(order: IOrder) => {
        this.toastr.success('Order was successful');
        // console.log(order);
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
