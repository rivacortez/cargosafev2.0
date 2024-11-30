import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {
    ToolbarEntrepreneurContentComponent
} from "../../components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {ToolbarContentComponent} from "../../components/toolbar-content/toolbar-content.component";

@Component({
  selector: 'app-home-company',
  standalone: true,
  imports: [
    RouterLink,
    ToolbarEntrepreneurContentComponent,
    ToolbarContentComponent
  ],
  templateUrl: './home-company.component.html',
  styleUrl: './home-company.component.css'
})
export class HomeCompanyComponent {

}
