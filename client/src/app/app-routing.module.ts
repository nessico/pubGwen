import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './account/admin/admin-panel.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { TestErrorsComponent } from './core/errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './account/lists/lists.component';
import { LoginComponent } from './account/login/login.component';
import { MemberDetailComponent } from './account/members/member-detail/member-detail.component';
import { MemberEditComponent } from './account/members/member-edit/member-edit.component';
import { MemberListComponent } from './account/members/member-list/member-list.component';
import { MessagesComponent } from './account/messages/messages.component';
import { RegisterComponent } from './account/register/register.component';
import { AdminGuard } from './core/_guards/admin.guard';
import { AuthGuard } from './core/_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './core/_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './core/_resolvers/member-detailed.resolver';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Resolver } from 'dns';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },

  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
    data: { breadcrumb: 'Shop', skip: false },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((mod) => mod.BasketModule),
    data: { breadcrumb: 'Basket', skip: false },
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),
    data: { breadcrumb: 'Checkout', skip: false },
  },
  {
    path: 'account',

    loadChildren: () =>
      import('./account/account.module').then((mod) => mod.AccountModule),
    data: { breadcrumb: { skip: true } },
  },
  {
    path: 'errors',
    component: TestErrorsComponent,
    data: { breadcrumb: 'Test Errors' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { breadcrumb: 'Not Found' },
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'Server Error' },
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
