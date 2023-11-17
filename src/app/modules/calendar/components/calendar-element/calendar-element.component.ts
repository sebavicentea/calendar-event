import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Day } from 'src/app/interfaces/day.model';
import { CalendarCreatorService } from 'src/app/services/calendar-creator.service';
import { DayViewComponent } from '../day-view/day-view.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { Reminder } from 'src/app/interfaces/reminder';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-calendar-element',
  templateUrl: './calendar-element.component.html',
  styleUrls: ['./calendar-element.component.scss']
})
export class CalendarElementComponent implements OnInit {

  public monthDays: Day[];

  public monthNumber: number;
  public year: number;
  private dayViewRef: MatDialogRef<DayViewComponent>;

  constructor(
    public calendarCreator: CalendarCreatorService,
    private matDialog: MatDialog,
    private calendarService: CalendarService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.setMonthDays(this.calendarCreator.getCurrentMonth());
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth(): void {
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  openDayView(day: Day) {

    const data = this.calendarService.listDay(day)
      .pipe(
        tap((reminders: Reminder[]) => {
          if (!reminders.length && this.dayViewRef) {
            this.dayViewRef.close()
          }
        }),
        switchMap((reminders: Reminder[]) => {
          const withWeatherInfo$ = reminders.map((reminder) => {
            return this.weatherService.getWeatherInformation(reminder)
              .pipe(
               map((data) => ({ ...reminder, weather: data }))
            );
          })
          
          return forkJoin(withWeatherInfo$)
        })
      )
    
      this.dayViewRef = this.matDialog.open(DayViewComponent, {
      data
    });
  }
}


