import { IOrderItem } from 'src/app/shared/_models/shopModels/order';
import { IBasketItem } from './../../../_models/shopModels/basket';
import { Observable } from 'rxjs';
import { BasketService } from './../../../../basket/basket.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IBasket } from 'src/app/shared/_models/shopModels/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Output() update: EventEmitter<{
    item: IBasketItem;
    event: any;
  }> = new EventEmitter<{ item: IBasketItem; event: any }>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() isOrder = false;
  @Input() items: IOrderItem[] | IBasketItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }

  onQuantitySelected(item: IBasketItem, event: any) {
    console.log(event.target.value);
    console.log(item);
    console.log(event);
    this.update.emit({ item, event });
  }

  numSequence(n: number) {
    return Array(n);
  }

  // Unused, can be changed based on what users like more
  //
  // decrementItemQuantity(item: IBasketItem) {
  //   this.decrement.emit(item);
  // }
  //
  // incrementItemQuantity(item: IBasketItem) {
  //   this.increment.emit(item);
  // }
  // @Output() decrement: EventEmitter<IBasketItem> =
  //   new EventEmitter<IBasketItem>();
  // @Output() increment: EventEmitter<IBasketItem> =
  //   new EventEmitter<IBasketItem>();
}
