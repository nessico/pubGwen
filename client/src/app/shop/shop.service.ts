import { IProduct } from 'src/app/shared/_models/shopModels/product';
import { ShopParams } from './../shared/_models/shopModels/shopParams';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/_models/shopModels/productBrand';
import {
  IProductPagination,
  ProductPagination,
} from '../shared/_models/shopModels/productPagination';
import { IType } from '../shared/_models/shopModels/productType';
import { IDeliveryMethod } from '../shared/_models/shopModels/deliveryMethod';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;

  // Caching products in shopService,
  //  Whenever a customer requests products, it will come from the shop.service as opposed to making another API call
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  productPagination = new ProductPagination();
  shopParams = new ShopParams();

  constructor(private http: HttpClient) {}

  getProducts() {
    // Filter functionality
    // Create a params object that we can pass into our API object as a query string
    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageIndex.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http
      .get<IProductPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          // Append new & old results from API to this.products for paginating cache
          this.products = [...this.products, ...response.body!.data];
          this.productPagination = response.body!;
          return this.productPagination;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = this.products.find((p) => p.id === id);

    if (product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map((response) => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map((response) => {
        this.types = response;
        return response;
      })
    );
  }

  getDeliveryMethods() {
    return this.http
      .get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods')
      .pipe(
        map((dm: IDeliveryMethod[]) => {
          return dm.sort((a, b) => b.price - a.price);
        })
      );
  }
}
