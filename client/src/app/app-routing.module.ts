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

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
      },
      {
        path: 'members/:username',
        component: MemberDetailComponent,
        resolve: { member: MemberDetailedResolver },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
