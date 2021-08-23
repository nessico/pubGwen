import { IBasketTotals } from 'src/app/shared/_models/shopModels/basket';
import { IBasketItem } from './../shared/_models/shopModels/basket';
import { BasketService } from './basket.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/_models/shopModels/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket | null>;
  basketTotal$!: Observable<IBasketTotals | null>;
  item!: IBasketItem;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  updateItemQuantity( event: any) {
    this.basketService.updateItemQuantity( event);
  }

  // Unused, can be changed based on what users like more
  //
  // incrementItemQuantity(item: IBasketItem) {
  //   this.basketService.incrementItemQuantity(item);
  // }

  // decrementItemQuantity(item: IBasketItem) {
  //   this.basketService.decrementItemQuantity(item);
  // }
}
