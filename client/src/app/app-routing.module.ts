import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './employee/admin/admin-panel.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { TestErrorsComponent } from './core/errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './employee/lists/lists.component';
import { LoginComponent } from './employee/login/login.component';
import { MemberDetailComponent } from './employee/members/member-detail/member-detail.component';
import { MemberEditComponent } from './employee/members/member-edit/member-edit.component';
import { MemberListComponent } from './employee/members/member-list/member-list.component';
import { MessagesComponent } from './employee/messages/messages.component';
import { RegisterComponent } from './employee/register/register.component';
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
    component: CheckoutComponent,
    data: { breadcrumb: 'Checkout' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { breadcrumb: 'Register' },
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        data: { breadcrumb: 'Members' },
      },
      {
        path: 'members/:username',
        component: MemberDetailComponent,
        data: { breadcrumb: { alias: 'memberDetails' } },
        resolve: {
          member: MemberDetailedResolver,
        },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
        data: { breadcrumb: 'Edit' },
      },
      {
        path: 'lists',
        component: ListsComponent,
        data: { breadcrumb: 'Lists' },
      },

      {
        path: 'messages',
        component: MessagesComponent,
        data: { breadcrumb: 'Messages' },
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
        data: { breadcrumb: 'Admin' },
      },
    ],
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
    component: NotFoundComponent,
    pathMatch: 'full',
    data: { breadcrumb: 'Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
