import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  error_msg_login:any = null;
  userdata:any = null;
  loginData:any = {};
  pattern_email = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

  constructor(private router:Router,private authservice:AuthServiceService) {
    this.loginForm = new FormGroup({

      email:new FormControl("",[Validators.required,Validators.pattern(this.pattern_email)]),
      password:new FormControl("",[Validators.required]),

    });
   }

   login()
   {
    // console.log('MAINN',this.loginForm.value);

     var password_value = this.loginForm.value;

    this.loginData = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password,
  };
console.log('MAINNN',this.loginData);
     this.authservice.login(this.loginData);

    /* if(password_value.password == "123456")
     {
      this.userdata = {
        userid:12,
        username:"Test",
      };
      this.error_msg_login = null;
      localStorage.setItem('Userdata',JSON.stringify(this.userdata));
      this.router.navigate(['/dashboard']);

     }else{
      this.error_msg_login = "Please Enter Correct Password.";
     }*/

   }

  ngOnInit(): void {
  }

  



}
