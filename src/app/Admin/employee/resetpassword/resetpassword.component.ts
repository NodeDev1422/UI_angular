import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,Validator, Validators,FormBuilder } from "@angular/forms";
import { AuthServiceService } from "../../services/auth-service.service";
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  userId:any;
  resetPasword:FormGroup;
  isPasswordSame:any;
  reset_data:any;
  constructor(private route: ActivatedRoute,private formBuilder:FormBuilder,private authservice:AuthServiceService) {
    this.userId = btoa(this.route.snapshot.queryParamMap.get('s'));
console.log('------',this.userId);
this.resetPasword = this.formBuilder.group({

  password:new FormControl("",[Validators.required]),
  new_pass:new FormControl("",[Validators.required]),

},{validator: this.checkPassword('password', 'new_pass')});
   }

  ngOnInit(): void {
  }

  resetPass()
  {
    var password = this.resetPasword.value.password;

    this.reset_data = {
      "password": password,
      "user_id":this.userId
  };

     this.authservice.resetPass(this.reset_data);

  }

  checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value == matchingControl.value) {
          
          matchingControl.setErrors(null);
            this.isPasswordSame = (matchingControl.status == 'VALID') ? false : true;
            console.log('Check1',this.isPasswordSame);
        } else {
            
          
          matchingControl.setErrors({ mustMatch: true });
            this.isPasswordSame = (matchingControl.status == 'INVALID') ? true : false;
            console.log('Check2---',this.isPasswordSame);
        }
    }
  }

}
