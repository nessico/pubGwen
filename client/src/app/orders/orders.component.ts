import { IOrder } from 'src/app/shared/_models/shopModels/order';
import { OrdersService } from './orders.service';
import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../shared/_models/shopModels/shopParams';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: IOrder[];
  shopParams = new ShopParams();
  totalCount!: number;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.shopParams).subscribe(
      (response: any) => {
        this.orders = response.data;
        this.shopParams.pageIndex = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageIndex !== event) {
      this.shopParams.pageIndex = event;
      this.getOrders();
    }
  }
}
