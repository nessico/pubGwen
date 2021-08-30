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
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
  cardNumberEmpty = true;
  cardExpiryEmpty = true;
  cardCvcEmpty = true;

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
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  // Destructing, https://codecraft.tv/courses/angular/es6-typescript/destructuring/
  // onChange receives an object with the error property, instead of saying object.error, we can just use the error itself
  // Stripe elements (cardNumber, cardExpiry, cardCvc) has it owns eventListener looking for any changes inside the element
  //  If there are changes, it will use the cardHandler to call our onChange event to check for errors

  onChange(event: any) {
    console.log(event);
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        this.cardNumberEmpty = event.empty;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        this.cardExpiryEmpty = event.empty;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        this.cardCvcEmpty = event.empty;
        break;
    }
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(basket: IBasket | null) {
    return this.stripe.confirmCardPayment(basket?.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm')?.get('nameOnCard')!.value,
        },
      },
    });
  }

  private async createOrder(basket: IBasket | null) {
    const orderToCreate = this.getOrderToCreate(basket!);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
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
