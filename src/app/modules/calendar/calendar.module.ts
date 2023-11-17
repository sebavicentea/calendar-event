import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderFormComponent } from '../reminder-form/components/reminder-form/reminder-form.component';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { CalendarElementComponent } from './components/calendar-element/calendar-element.component';
import { DayComponent } from './components/day/day.component';
import { ReminderNotificationComponent } from './components/reminder-notification/reminder-notification.component';
import { MatIconModule } from '@angular/material/icon';
import { DayViewComponent } from './components/day-view/day-view.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CalendarComponent, CalendarElementComponent, DayComponent, ReminderNotificationComponent, DayViewComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatIconModule,
    SharedModule,
    ReminderFormModule,
  ],
  entryComponents: [ReminderFormComponent],
})
export class CalendarModule { }
