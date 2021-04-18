import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { HeaderComponent } from './Admin/header/header.component';
import { FooterComponent } from './Admin/footer/footer.component';
import { SidemenuComponent } from './Admin/sidemenu/sidemenu.component';
import { WidgetsComponent } from './Admin/widgets/widgets.component';
import { LoginComponent } from './Admin/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthServiceService } from "./Admin/services/auth-service.service";
import { AuthInterceptor } from "../app/auth.interceptor";
import { EmployeeComponent } from './Admin/employee/employee.component';
import { DataTablesModule } from 'angular-datatables';
import { SignupComponent } from './Admin/signup/signup.component';
import { AddEmployeeComponent } from './Admin/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Admin/employee/edit-employee/edit-employee.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ResetpasswordComponent } from './Admin/employee/resetpassword/resetpassword.component';
import { ForgotPasswordComponent } from './Admin/employee/forgot-password/forgot-password.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    WidgetsComponent,
    LoginComponent,
    EmployeeComponent,
    SignupComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ResetpasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    NgxSpinnerModule
  ],
  providers: [AuthServiceService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
