import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailedResolver } from '../core/_resolvers/member-detailed.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from '../core/_guards/prevent-unsaved-changes.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { AdminGuard } from '../core/_guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { breadcrumb: 'Register' },
  },
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
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
