import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [  
    ShopComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ], exports: [ShopComponent]
})
export class ShopModule { }
