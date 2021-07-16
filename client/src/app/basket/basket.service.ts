import { Basket, IBasketItem } from './../shared/_models/shopModels/basket';
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
  //Since it's private, you'll need a public property (basket$) to be accessible by other components
  //basket$ observable

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {}

  //From response of http client, set basket source to the basket from api
  //Subscribe inside component with async pipe
  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        console.log(response);
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
