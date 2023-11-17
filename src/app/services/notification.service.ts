import { Injectable } from '@angular/core';
import { Reminder } from '../interfaces/reminder';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private scheduledNotifications: Map<number, any> = new Map<number, any>();
  private displayingNotifications$: BehaviorSubject<Reminder[]> = new BehaviorSubject([]);

  constructor() { }

  getNotifications(): Observable<Reminder[]> {
    return this.displayingNotifications$;
  }

  showNotification(reminder: Reminder): void {
    const notifications = [...this.displayingNotifications$.value, reminder];
    this.displayingNotifications$.next(notifications);
  }

  notificationsAcknowledged() {
    this.displayingNotifications$.next([]);
  }

  scheduleNotification(reminder: Reminder): void {

    const now = new Date().getTime();
    const notificationTime = new Date(reminder.dateTime).getTime();
    
    if (notificationTime > now) {
      const delay = notificationTime - now;

      if (delay > 2147483646) {
        setTimeout(() => {
          this.scheduleNotification(reminder);
        }, 2147483646)

        return;
      }

      const timeoutId = setTimeout(() => {
        this.notifyUser(reminder);
      }, delay);

      // Store the timeoutId for later reference
      this.scheduledNotifications.set(reminder.id, timeoutId);
    }
  }


  cancelNotification(reminder: Reminder): void {
    const timeoutId = this.scheduledNotifications.get(reminder.id);

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.scheduledNotifications.delete(reminder.id);
    }
  }

  private notifyUser(reminder: Reminder): void {
    if (reminder) {
      this.showNotification(reminder);
    }

    // Remove the notification entry after showing the notification
    this.scheduledNotifications.delete(reminder.id);
  }
}