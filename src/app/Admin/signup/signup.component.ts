import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  error_msg_login:any = null;
  userdata:any = null;
  loginData:any = {};
  pattern_email = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  constructor(private router:Router,private authservice:AuthServiceService) {
    this.signupForm = new FormGroup({

      fullName:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required,Validators.pattern(this.pattern_email)]),
      password:new FormControl("",[Validators.required]),

    });
   }

  ngOnInit(): void {
  }


  signup()
  {
    var userInput={
      name:this.signupForm.value.fullName,
      email:this.signupForm.value.email,
      password:this.signupForm.value.password,
    };

    this.authservice.signupSubmit(userInput);
    this.signupForm.reset();
    
  }

}
