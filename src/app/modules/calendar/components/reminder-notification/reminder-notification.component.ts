import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/interfaces/reminder';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reminder-notification',
  templateUrl: './reminder-notification.component.html',
  styleUrls: ['./reminder-notification.component.scss']
})
export class ReminderNotificationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reminder[],
    private notificationService: NotificationService
  ) { }

  ngOnDestroy(): void {
    this.notificationService.notificationsAcknowledged()
  }
  
}
