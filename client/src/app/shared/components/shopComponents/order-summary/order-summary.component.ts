import { BasketService } from '../../../../basket/basket.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from 'src/app/shared/_models/shopModels/basket';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() shipping!: number;
  @Input() subtotal!: number;
  @Input() total!: number;
 

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
  
  }
}
