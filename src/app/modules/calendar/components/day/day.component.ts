import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from 'src/app/interfaces/day.model';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
 
  @Input() day: Day;

  reminders$: Observable<Reminder[]>

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.reminders$ = this.calendarService.listDay(this.day)
  }
}
