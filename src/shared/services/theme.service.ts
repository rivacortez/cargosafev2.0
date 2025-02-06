import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService  {
  private activeTheme: string = 'light';

  constructor() {
    this.loadTheme(this.activeTheme);
  }

  loadTheme(theme: string): void {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme}-theme.css`;
    } else {
      const link = document.createElement('link');
      link.id = 'app-theme';
      link.rel = 'stylesheet';
      link.href = `${theme}-theme.css`;
      document.head.appendChild(link);
    }
    this.activeTheme = theme;
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === 'light' ? 'dark' : 'light';
    this.loadTheme(this.activeTheme);
  }

  getActiveTheme(): string {
    return this.activeTheme;
  }
}
