import {
  Basket,
  IBasketItem,
  IBasketTotals,
} from './../shared/_models/shopModels/basket';
import { IProduct } from './../shared/_models/shopModels/product';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/_models/shopModels/basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  //BehaviorSubject - observable that allows for multi-casting of the observable itself and allows for multiple subscribers
  //Since it's private, you'll need a public property (basket$,etc) to be accessible by other components
  //basket$,etc is observable

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  //From response of http client, set basket source to the basket from api
  //Subscribe inside component with async pipe
  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket!.items = this.addOrUpdateItem(basket?.items, itemToAdd, quantity);
    this.setBasket(basket!);
  }

  //helper methods

  //to get current value of basket without subscribing
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket!.items.findIndex((x) => x.id === item.id);
    basket!.items[foundItemIndex].quantity++;
    this.setBasket(basket!);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket?.items.findIndex((x) => x.id === item.id);
    if (basket!.items[foundItemIndex!].quantity > 1) {
      basket!.items[foundItemIndex!].quantity--;
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket!.items.some((x) => x.id === item.id)) {
      basket!.items = basket!.items.filter((i) => i.id !== item.id);
      if (basket!.items.length > 0) {
        this.setBasket(basket!);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket | null) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket!.id).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //calculate total inside basket and set it to the basket$ Behavior Subject
  //a is count, b is item, given initial val of 0
  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket!.items.reduce(
      (a, b) => b.price * b.quantity + a,
      0
    );
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  //creates a basket if user doesn't currently have a basket
  //for persistence, use local storage to get basket id
  private createBasket(): IBasket | null {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  //to map item to basket
  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }

  //if there's already an item of type X, then increase quantity of item X
  //or, if there is no item of type X, push an additional item X
  private addOrUpdateItem(
    items: IBasketItem[] | undefined,
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items!.findIndex((i) => i.id === itemToAdd.id);
    //item was not found in items
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items?.push(itemToAdd);
    } else {
      items![index].quantity += quantity;
    }
    return items!;
  }
}
