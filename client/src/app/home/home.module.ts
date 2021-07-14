import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CoreModule } from '../core/core.module';
import { EmployeeModule } from '../employee/employee.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AppRoutingModule,],
  exports: [HomeComponent],
})
export class HomeModule {}
