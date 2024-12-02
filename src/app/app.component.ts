import {Component, HostListener, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, NgIf} from "@angular/common";
import {ToolbarContentComponent} from "./public/components/toolbar-content/toolbar-content.component";
import {SidebarCompanyComponent} from "./public/sidebar-company/sidebar-company.component";
import {AuthenticationService} from "./iam/services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarContentComponent, NgIf, SidebarCompanyComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  isSignedIn!: Observable<boolean>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn;
  }
}
