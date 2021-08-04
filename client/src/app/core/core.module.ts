import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { SharedModule } from '../shared/shared.module';
import { HasRoleDirective } from './_directives/has-role.directive';
import { HomeModule } from '../home/home.module';
import { RouterModule } from '@angular/router';
import { SectionHeaderComponent } from './section-header/section-header.component';

@NgModule({
  declarations: [
    NavComponent,
    HasRoleDirective,
    ConfirmDialogComponent,
    RolesModalComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorsComponent,
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HomeModule,
    BreadcrumbModule,
  ],
  exports: [
    NavComponent,
    HasRoleDirective,
    ConfirmDialogComponent,
    RolesModalComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorsComponent,
    SectionHeaderComponent,
  ],
})
export class CoreModule {}
