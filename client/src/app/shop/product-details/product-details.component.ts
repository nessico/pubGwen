import { BasketService } from './../../basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/_models/shopModels/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private router: Router,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }


  loadProduct() {
    this.shopService
      .getProduct(+this.activateRoute.snapshot.paramMap.get('id')!)
      .subscribe(
        (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
