import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../../iam/services/authentication.service";
import {ProfileService} from "../../profile/service/profile.service";

@Component({
  selector: 'app-sidebar-company',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet

  ],
  templateUrl: './sidebar-company.component.html',
  styleUrl: './sidebar-company.component.css'
})
export class SidebarCompanyComponent implements OnInit {
  username: string = '';
  email: string = '';
  profileImageUrl: string = '';

  ngOnInit(): void {
    this.showSidebar('header-toggle', 'sidebar', 'header', 'main');
    this.setupSidebarLinks();
    this.setupThemeButton();
    this.loadUserProfile();
  }
  constructor(
    private authenticationService: AuthenticationService,
    private profileService: ProfileService
  ) {}

  private loadUserProfile(): void {
    this.authenticationService.currentUserId.subscribe(userId => {
      if (userId) {
        this.profileService.getById(userId).subscribe(profile => {
          this.username = profile.firstName;
          this.email = profile.email;
          this.profileImageUrl = profile.profileImageUrl || 'https://i.pinimg.com/originals/c7/f5/78/c7f578937fdc07702eacff129b4107f7.png';
        });
      }
    });
  }

  private showSidebar(
    toggleId: string,
    sidebarId: string,
    headerId: string,
    mainId: string
  ): void {
    const toggle = document.getElementById(toggleId);
    const sidebar = document.getElementById(sidebarId);
    const header = document.getElementById(headerId);
    const main = document.getElementById(mainId);

    if (toggle && sidebar && header && main) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('show-sidebar');
        header.classList.toggle('left-pd');
        main.classList.toggle('left-pd');
      });
    }
  }

  private setupSidebarLinks(): void {
    const sidebarLink = document.querySelectorAll<HTMLAnchorElement>(
      '.sidebar__list a'
    );

    function linkColor(this: HTMLAnchorElement): void {
      sidebarLink.forEach((l) => l.classList.remove('active-link'));
      this.classList.add('active-link');
    }

    sidebarLink.forEach((l) =>
      l.addEventListener('click', linkColor)
    );
  }

  private setupThemeButton(): void {
    const themeButton = document.getElementById(
      'theme-button'
    ) as HTMLButtonElement;
    const darkTheme = 'dark-theme';
    const iconTheme = 'ri-sun-fill';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = (): string =>
      document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = (): string =>
      themeButton.classList.contains(iconTheme)
        ? 'ri-moon-clear-fill'
        : 'ri-sun-fill';

    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
        darkTheme
      );
      themeButton.classList[
        selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'
        ](iconTheme);
    }

    themeButton.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    });
  }
}
