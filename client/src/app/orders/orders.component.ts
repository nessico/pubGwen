import { IOrder } from 'src/app/shared/_models/shopModels/order';
import { OrdersService } from './orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: IOrder[];

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        this.orders = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
