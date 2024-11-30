import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NotificationsComponent {
 /* @Input() message: string = '';
  @Input() description: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() imageUrl: string = '';

  getClass() {
    return {
      'notification-success': this.type === 'success',
      'notification-error': this.type === 'error',
      'notification-info': this.type === 'info'
    };
  }

  close() {
    // Implement close functionality
  }*/
}
