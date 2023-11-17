import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  reminderForm: FormGroup;
  colorOptions: Array<string> = ['#FF836D', '#D8F4EA', '#DFDAEB', '#FDEFE3']
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReminderFormComponent>,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.reminderForm = this.fb.group({
      text: this.fb.control(null, [Validators.maxLength(30), Validators.required]),
      dateTime: this.fb.control(null, Validators.required),
      color: this.fb.control(this.colorOptions[0]),
      city: this.fb.control(null),
      id: this.fb.control(null)
    })

    if (this.data) {
      this.reminderForm.patchValue({
        ...this.data,
        dateTime: this.dateWorkAround(new Date(this.data.dateTime))
      })
    }
  }

  private dateWorkAround(datetime: Date): string {
    const hours = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours()
    const minutes = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes()

    return datetime.getFullYear() + '-' +
      ("0" + (datetime.getMonth() + 1)).slice(-2)
      + '-' + ("0" + datetime.getDate()).slice(-2)
      + 'T' + hours + ':' + minutes;
  }

  submitForm() {
    if (this.reminderForm.invalid) return;
    
    if (this.reminderForm.value.id) {
      this.calendarService.edit(this.reminderForm.value);
    } else {
      this.calendarService.create(this.reminderForm.value);
    }

    this.dialogRef.close();
  }

}
