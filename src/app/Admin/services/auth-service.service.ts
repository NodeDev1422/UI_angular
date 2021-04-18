import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable()
export class AuthServiceService {

  
  API_URL: string = 'http://localhost:3005';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  user:any = {};
  
  constructor(public router: Router,private httpClient: HttpClient,private SpinnerService: NgxSpinnerService) { }

  register(): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/users/register`, this.user).pipe(
        catchError(this.handleError)
    )
  }

  login(userData) {
    this.SpinnerService.show();
    return this.httpClient.post<any>(`${this.API_URL}/Authentication/login`, userData)
      .subscribe((res: any) => {
        console.log('DATATATA',res);

        if(res.is_error == false)
        {
          localStorage.setItem('access_token', res.data.token);
          localStorage.setItem('userData', JSON.stringify(res.data.userData));
          this.SpinnerService.hide();  
          Swal.fire('Welcome!', `Login Success!`, 'success');
          this.router.navigate(['dashboard']);
        }else{
          this.SpinnerService.hide();  
          
            Swal.fire('', `${res.display_msg}`, 'error');
          
//alert(res.display_msg);
        }

        
        /*this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })*/
      })
  }

  signupSubmit(userData) {
    this.SpinnerService.show();
    return this.httpClient.post<any>(`${this.API_URL}/signup/register`, userData)
      .subscribe((res: any) => {
        console.log('DATATATA',res);

        if(res.is_error == false)
        {
         // localStorage.setItem('access_token', res.data.token);
          //localStorage.setItem('userData', JSON.stringify(res.data.userData));
          
            this.SpinnerService.hide();
            Swal.fire('', `${res.display_msg}`, 'success');
          //  alert(res.display_msg);
            //this.router.navigate(['login']);
          
          this.SpinnerService.hide(); 
          this.router.navigate(['login']);
        }else{
          this.SpinnerService.hide(); 
          Swal.fire('', `${res.display_msg}`, 'error');
//alert(res.display_msg);
        }

        
        /*this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })*/
      })
  }

  

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userData');
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['login']);
    }
  }

  getEmployees(userid): Observable<any> {
    
    return this.httpClient.get(`${this.API_URL}/employee/list?userId=${userid}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  mainData_employees(empId)
  {
    return this.getEmployees(empId).subscribe((res) => {
      console.log('RESSSS',res);
      if(res.is_error == true && res.auth == false)
      {
        Swal.fire('', `${res.display_msg}`, 'error');
      //  alert(res.display_msg);
        this.router.navigate(['login']);
      }else if(res.auth == true){
        //this.dtUsers = res.data;
        return res.data;
        // setTimeout(() => {
        //   console.log('LOADED',this.main_data);
          
        //  }, 4000);
       
      }
  
      //this.router.navigate(['users/profile/' + res.msg._id]);
    })
  }


  employeeInsert(userData) {
    this.SpinnerService.show();
    return this.httpClient.post<any>(`${this.API_URL}/employee/create`, userData)
      .subscribe((res: any) => {
        console.log('DATATATA',res);

        if(res.is_error == false)
        {
          this.SpinnerService.hide();
          Swal.fire('Sucess!', `${res.display_msg}`, 'success');
          // alert(res.display_msg);
          this.router.navigate(['addEmployee']);
        }else{
          if(res.is_error == true && res.auth == false)
          {
            this.SpinnerService.hide();
            Swal.fire('', `${res.display_msg}`, 'error');
          //  alert(res.display_msg);
            this.router.navigate(['login']);
          }
          else if(res.is_error == true && res.auth == true)
          {
            this.SpinnerService.hide();
            Swal.fire('', `${res.display_msg}`, 'error');
          //  alert(res.display_msg);
            //this.router.navigate(['login']);
          }

        }

        
        /*this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })*/
      })
  }

  forgotPass(userData)
  {
    return this.httpClient.post<any>(`${this.API_URL}/Authentication/generateResetPasswordLink`, userData)
    .subscribe((res: any) => {
      console.log('DATATATA',res);

      if(res.is_error == false)
      {
        Swal.fire('Success!', `${res.display_msg}`, 'success');
       // alert(res.display_msg);
        this.router.navigate(['login']);
      }else{
        if(res.is_error == true && res.auth == false)
        {
          Swal.fire('', `${res.display_msg}`, 'error');
         // alert(res.display_msg);
     //     this.router.navigate(['forgotpassword']);
        }

        if(res.is_error == true)
        {
          Swal.fire('', `${res.display_msg}`, 'error');
        //  alert(res.display_msg);
     //     this.router.navigate(['forgotpassword']);
        }

      }

      
      /*this.getUserProfile(res._id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['users/profile/' + res.msg._id]);
      })*/
    })
  }


  resetPass(userData)
  {
    return this.httpClient.post<any>(`${this.API_URL}/Authentication/resetpassword`, userData)
    .subscribe((res: any) => {
      console.log('DATATATA',res);

      if(res.is_error == false)
      {
        Swal.fire('Success!', `${res.display_msg}`, 'success');
       // alert(res.display_msg);
        this.router.navigate(['login']);
      }else{
        if(res.is_error == true && res.auth == false)
        {
          Swal.fire('', `${res.display_msg}`, 'error');
         // alert(res.display_msg);
          this.router.navigate(['forgotpassword']);
        }

        if(res.is_error == true)
        {
          Swal.fire('', `${res.display_msg}`, 'error');
        //  alert(res.display_msg);
          this.router.navigate(['forgotpassword']);
        }

      }

      
      /*this.getUserProfile(res._id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['users/profile/' + res.msg._id]);
      })*/
    })
  }

  employeeUpdate(userData)
  {
    return this.httpClient.post<any>(`${this.API_URL}/employee/update`, userData)
    .subscribe((res: any) => {
      console.log('DATATATA',res);

      if(res.is_error == false)
      {
        Swal.fire('Sucess!', `${res.display_msg}`, 'success');
       // alert(res.display_msg);
        this.router.navigate(['dashboard']);
      }else{
        if(res.is_error == true && res.auth == false)
        {
          Swal.fire('', `${res.display_msg}`, 'error');
          //alert(res.display_msg);
          this.router.navigate(['login']);
        }
        else if(res.is_error == true && res.auth == true)
          {
            this.SpinnerService.hide();
            Swal.fire('', `${res.display_msg}`, 'error');
          //  alert(res.display_msg);
            //this.router.navigate(['login']);
          }

      }

      
      /*this.getUserProfile(res._id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['users/profile/' + res.msg._id]);
      })*/
    })
  }


  employeeDelete(userData) {
    return this.httpClient.post<any>(`${this.API_URL}/employee/delete`, userData)
      .subscribe((res: any) => {
        console.log('DATATATA',res);

        if(res.is_error == false)
        {
          Swal.fire('Sucess!', `${res.display_msg}`, 'success');
          //alert(res.display_msg);
        }else{
          if(res.is_error == true && res.auth == false)
          {
            Swal.fire('', `${res.display_msg}`, 'error');
           // alert(res.display_msg);
            this.router.navigate(['login']);
          }
          else if(res.is_error == true && res.auth == true)
          {
            this.SpinnerService.hide();
            Swal.fire('', `${res.display_msg}`, 'error');
          //  alert(res.display_msg);
            //this.router.navigate(['login']);
          }
          

        }

        
        /*this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })*/
      })
  }



  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
