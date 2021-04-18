import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from "@angular/forms";
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm:FormGroup;
  pattern_email = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  constructor(private auth:AuthServiceService,private router:Router) { 
    this.employeeForm = new FormGroup({
      fullName:new FormControl("",[Validators.required]),
      emp_id:new FormControl("",[Validators.required]),
      job_title:new FormControl("",[Validators.required]),
      department:new FormControl("",[Validators.required]),
      location:new FormControl("",[Validators.required]),
      age:new FormControl("",[Validators.required]),
      salary:new FormControl("",[Validators.required]),
    });
  }
 //email:new FormControl("",[Validators.required,Validators.pattern(this.pattern_email)]),
  ngOnInit(): void {
  }

  addEmp()
  {
    var getEmployeeId = JSON.parse(localStorage.getItem('userData'));
    var inputObject={
      "fullName":this.employeeForm.value.fullName,
      "empId":this.employeeForm.value.emp_id,
      "jobTitle":this.employeeForm.value.job_title,
      "department":this.employeeForm.value.department,
      "location":this.employeeForm.value.location,
      "age":this.employeeForm.value.age,
      "salary":this.employeeForm.value.salary,
      "userId":getEmployeeId.id,
    };

    console.log('SDDDDD',inputObject);
    this.auth.employeeInsert(inputObject);
   this.employeeForm.reset();
   // console.log('---------',inputObject);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
