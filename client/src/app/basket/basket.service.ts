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
}
