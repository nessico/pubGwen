import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
// https://material.angular.io/guide/creating-a-custom-stepper-using-the-cdk-stepper
export class StepperComponent extends CdkStepper implements OnInit {
  // Sets child component to linearMode
  @Input() linearModeSelected!: boolean;
  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  // Keeps track of what step you are currently on
  onClick(index: number) {
    this.selectedIndex = index;
  }
}
