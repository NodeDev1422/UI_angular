import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,Validator, Validators } from "@angular/forms";
import { AuthServiceService } from "../../services/auth-service.service";
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
userData:any;
employeeForm:FormGroup;
  constructor(private route: ActivatedRoute,private auth:AuthServiceService) {
    
this.userData = JSON.parse(atob(this.route.snapshot.queryParamMap.get('dt')));
console.log('------',this.userData);

this.employeeForm = new FormGroup({
  fullName:new FormControl(this.userData.full_name,[Validators.required]),
  emp_id:new FormControl(this.userData.emp_id,[Validators.required]),
  job_title:new FormControl(this.userData.job_title,[Validators.required]),
  department:new FormControl(this.userData.department,[Validators.required]),
  location:new FormControl(this.userData.location,[Validators.required]),
  age:new FormControl(this.userData.age,[Validators.required]),
  salary:new FormControl(this.userData.salary,[Validators.required]),
});

   }

   editEmp()
  {
    var getEmployeeId = JSON.parse(localStorage.getItem('userData'));
    var inputObject={
      "id":this.userData._id,
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
    this.auth.employeeUpdate(inputObject);
   //this.employeeForm.reset();
   // console.log('---------',inputObject);
  }


  ngOnInit(): void {
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
