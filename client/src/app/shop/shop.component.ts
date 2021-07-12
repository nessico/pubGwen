import { IType } from './../shared/_models/shopModels/productType';

import { IBrand } from './../shared/_models/shopModels/productBrand';
import { ShopService } from './shop.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/_models/shopModels/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected)
      .subscribe(
        (response: any) => {
          this.products = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected = event.target.value.toString();
    this.getProducts();
  }
}
