import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  employeesList:any = [];
  main_data:any;
  flg: boolean = false;

  
  //employees:any;
  /*dtUsers =[
    {"id": 101, "firstName": "Anil", "lastName": "Singh"},
    {"id": 102, "firstName": "Reena", "lastName": "Singh"},
    {"id": 103, "firstName": "Aradhay", "lastName": "Simgh"},
    {"id": 104, "firstName": "Dilip", "lastName": "Singh"},
    {"id": 105, "firstName": "Alok", "lastName": "Singh"},
    {"id": 106, "firstName": "Sunil", "lastName": "Singh"},
    {"id": 107, "firstName": "Sushil", "lastName": "Singh"},
    {"id": 108, "firstName": "Sheo", "lastName": "Shan"},
    {"id": 109, "firstName": "Niranjan", "lastName": "R"},
    {"id": 110, "firstName": "Lopa", "lastName": "Mudra"},
    {"id": 111, "firstName": "Paramanand","lastName": "Tripathi"}
  ];*/
  constructor(private authService:AuthServiceService,private router:Router) {
   // this.get_employees();
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    //console.log('LOADED_init',this.main_data);
   this.get_employees();

   
  }

  edit(empData)
  {
    var text_binary =btoa(JSON.stringify(empData));
    this.router.navigate(['editEmployee'],{queryParams:{dt:text_binary}});
    }

get_employees()
{
  
  var getEmployeeId = JSON.parse(localStorage.getItem('userData'));
  this.authService.getEmployees(getEmployeeId.id).subscribe((res) => {
    console.log('RESSSS',res);
    if(res.is_error == true && res.auth == false)
    {
      alert(res.display_msg);
      this.router.navigate(['login']);
    }else if(res.auth == true){
      this.flg = true;
      this.employeesList = res.data;
   
     
    }

    //this.router.navigate(['users/profile/' + res.msg._id]);
  })
}


stateChange(flag,id)
{
  var flag_text = (flag == "Y")?"Are You Sure To Enable.":"Are You Sure To Disable";
var input = window.confirm(flag_text);
//alert(id);
if(input == true)
{
  var user_data = {
    "id":id,
    "status":flag
  };
  this.authService.employeeDelete(user_data);
  this.get_employees();
//alert('You clicked Ok');
}



}


}
