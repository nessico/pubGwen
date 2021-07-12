import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';




@NgModule({
  declarations: [  
    ShopComponent, ProductItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ], exports: [ShopComponent]
})
export class ShopModule { }
