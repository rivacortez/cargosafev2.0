import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";



@Component({
  selector: 'app-home-company',
  standalone: true,
  imports: [
    RouterLink,

  ],
  templateUrl: './home-company.component.html',
  styleUrl: './home-company.component.css'
})
export class HomeCompanyComponent {

}
