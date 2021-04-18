import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import {  EmployeeComponent } from './Admin/employee/employee.component';
import { WidgetsComponent } from "./Admin/widgets/widgets.component";
import{ LoginComponent } from "./Admin/login/login.component";
//import { AuthServiceService as AuthGuard } from "./Admin/services/auth-service.service";
import { AddEmployeeComponent } from './Admin/employee/add-employee/add-employee.component';
import{ AuthGuardService  } from "./Admin/services/auth-guard.service";
import { EditEmployeeComponent } from "./Admin/employee/edit-employee/edit-employee.component";
import { SignupComponent } from "../app/Admin/signup/signup.component";
import { ResetpasswordComponent } from "../app/Admin/employee/resetpassword/resetpassword.component";
import { ForgotPasswordComponent } from "../app/Admin/employee/forgot-password/forgot-password.component";
import { AuthRestrictService } from "../app/Admin/services/auth-restrict.service";
const routes: Routes = [

  //before login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent,canActivate:[AuthRestrictService]},
  { path:'signup', component: SignupComponent,canActivate:[AuthRestrictService]},
  { path:'resetpassword', component: ResetpasswordComponent,canActivate:[AuthRestrictService]},
  { path:'forgotpassword', component: ForgotPasswordComponent,canActivate:[AuthRestrictService]},

  //after login
{ path:'dashboard', component: EmployeeComponent,canActivate:[AuthGuardService]},
  { path:'addEmployee', component: AddEmployeeComponent,canActivate:[AuthGuardService]},
  { path:'editEmployee', component: EditEmployeeComponent,canActivate:[AuthGuardService]},
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
