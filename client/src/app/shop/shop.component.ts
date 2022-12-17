import { ShopParams } from './../shared/_models/shopModels/shopParams';
import { IType } from './../shared/_models/shopModels/productType';
import { IBrand } from './../shared/_models/shopModels/productBrand';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { IProduct } from '../shared/_models/shopModels/product';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  shopParams!: ShopParams;
  totalCount!: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    // Access shop params from service 
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(
      (response: any) => {
        this.products = response.data;
        this.totalCount = response.count;
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
    // Set brands inside service, so our service remembers what we're passing in when we get our products
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    // Set types inside service
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(event: any) {
    // Set sort inside service
    const params = this.shopService.getShopParams();
    params.sort = event.target.value.toString();
    this.shopService.setShopParams(params);
    this.getProducts();
}

  onSearch() {
    // Set onSearch inside service
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    // Set onReset inside service
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

  onPageChanged(event: any) {
    // Set onPageChanged inside service
    const params = this.shopService.getShopParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }
}
