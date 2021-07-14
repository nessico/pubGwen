import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    LoginComponent,
    ListsComponent,
    MemberListComponent,
    MemberDetailComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    MemberMessagesComponent,
  ],
  imports: [CommonModule, CoreModule, SharedModule, AppRoutingModule, HomeModule],
  exports: [
    AdminPanelComponent,
    UserManagementComponent,
    LoginComponent,
    ListsComponent,
    MemberListComponent,
    MemberDetailComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    MemberMessagesComponent,
  ],
})
export class EmployeeModule {}
