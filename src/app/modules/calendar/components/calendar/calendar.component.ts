import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { takeUntil, filter, switchMap, tap } from 'rxjs/operators';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReminderFormComponent } from '../../../reminder-form/components/reminder-form/reminder-form.component';
import { ReminderNotificationComponent } from '../reminder-notification/reminder-notification.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<boolean>();
  private openNotificationRef: MatDialogRef<ReminderNotificationComponent>;

  constructor(
    private calendarService: CalendarService,
    private notificationService: NotificationService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.calendarService.initReminders();

    this.listenForEvents();
  }


  private listenForEvents() {
    this.notificationService.getNotifications().pipe(
      takeUntil(this.onDestroy$),
      filter(reminders => !!reminders?.length),
      switchMap((reminders) => {
        if (this.openNotificationRef?.componentInstance) {
          this.openNotificationRef.componentInstance.data = reminders;
          return of(null);
        } else {
          this.openNotificationRef = this.matDialog.open(ReminderNotificationComponent, {
            data: reminders
          });

          return this.openNotificationRef.afterClosed()
            .pipe(
              tap(() => {
                this.notificationService.notificationsAcknowledged();
                this.openNotificationRef = null;
              })
            )
        }
      })
    ).subscribe(() => {
        
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openReminderForm() {
    this.matDialog.open(ReminderFormComponent, {
      data: null,
    });
  }

}
