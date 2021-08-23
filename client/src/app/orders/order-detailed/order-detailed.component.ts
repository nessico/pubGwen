import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/_models/shopModels/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order!: IOrder;

  // https://angular.io/api/router/ActivatedRoute
  // Navigate to order ID from your routes, e.g. /{{url}}/orders/10
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrderDetailed();
  }

  getOrderDetailed() {
    this.orderService
      .getOrderDetailed(+this.route.snapshot.paramMap.get('id')!)
      .subscribe(
        (response: any) => {
          this.order = response;
          console.log(this.order);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
