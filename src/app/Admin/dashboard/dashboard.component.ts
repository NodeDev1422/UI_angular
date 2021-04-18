import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {SidemenuComponent} from "../sidemenu/sidemenu.component";
import {FooterComponent} from "../footer/footer.component";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
