import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<{ message: string, description: string, type: 'success' | 'error' | 'info', imageUrl: string }>();

  getNotification(): Observable<{ message: string, description: string, type: 'success' | 'error' | 'info', imageUrl: string }> {
    return this.notificationSubject.asObservable();
  }

  showNotification(message: string, description: string, type: 'success' | 'error' | 'info', imageUrl: string = ''): void {
    this.notificationSubject.next({ message, description, type, imageUrl });
  }
}
