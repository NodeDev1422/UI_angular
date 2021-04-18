import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from "@angular/forms";
import { AuthServiceService } from "../../services/auth-service.service";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm:FormGroup;
  pattern_email = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  forgotPassData:any;
  constructor(private authservice:AuthServiceService) { 

    this.forgotForm = new FormGroup({

      email:new FormControl("",[Validators.required,Validators.pattern(this.pattern_email)]),

    });

  }

  ngOnInit(): void {
  }


  forgotpassword()
  {
    this.forgotPassData = {
      "email": this.forgotForm.value.email,
  };

     this.authservice.forgotPass(this.forgotPassData);
  }

}
