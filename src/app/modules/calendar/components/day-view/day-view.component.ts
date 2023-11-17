import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Reminder, ReminderWeather } from 'src/app/interfaces/reminder';
import { ReminderFormComponent } from 'src/app/modules/reminder-form/components/reminder-form/reminder-form.component';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Observable<ReminderWeather[]>,
    private dialogRef: MatDialogRef<DayViewComponent>,
    private calendarService: CalendarService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    
  }

  editReminder(reminder: Reminder) {
    this.openReminderForm(reminder);
    this.dialogRef.close()
  }

  deleteReminder(reminder: Reminder) {
    this.calendarService.delete(reminder.id)
    this.dialogRef.close()
  }

  private openReminderForm(reminder: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: reminder,
      
    });
  }
}
