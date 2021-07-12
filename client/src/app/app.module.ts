import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './employee/register/register.component';
import { MemberListComponent } from './employee/members/member-list/member-list.component';
import { MemberDetailComponent } from './employee/members/member-detail/member-detail.component';
import { ListsComponent } from './employee/lists/lists.component';
import { MessagesComponent } from './employee/messages/messages.component';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './core/_interceptors/error.interceptor';
import { MemberCardComponent } from './employee/members/member-card/member-card.component';
import { JwtInterceptor } from './core/_interceptors/jwt.interceptor';
import { MemberEditComponent } from './employee/members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './employee/members/photo-editor/photo-editor.component';
import { MemberMessagesComponent } from './employee/members/member-messages/member-messages.component';
import { LoginComponent } from './employee/login/login.component';
import { CoreModule } from './core/core.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    NgxSpinnerModule,
    EmployeeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
