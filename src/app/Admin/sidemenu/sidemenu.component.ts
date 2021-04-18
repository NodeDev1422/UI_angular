import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../services/auth-service.service";
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor(private auth:AuthServiceService) { }

  ngOnInit(): void {
  }

  logout()
  {
    console.log('Logut');
    this.auth.logout();
  }

}
