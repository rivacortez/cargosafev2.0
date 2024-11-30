import {Component, HostListener, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {ToolbarContentComponent} from "./public/components/toolbar-content/toolbar-content.component";
import {SidebarCompanyComponent} from "./public/sidebar-company/sidebar-company.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarContentComponent, NgIf, SidebarCompanyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {










}
