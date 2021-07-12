import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductPagination } from '../shared/_models/productPagination';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProductPagination>(this.baseUrl + 'products');
  }
}
