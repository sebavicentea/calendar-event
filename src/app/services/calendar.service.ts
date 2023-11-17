import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import { Day } from '../interfaces/day.model';
import { NotificationService } from './notification.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private remindersSubject: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);
  public reminders$: Observable<Reminder[]> = this.remindersSubject.asObservable();


  constructor(private notificationService: NotificationService) {}

  initReminders() {
    MOCK_REMINDERS.map((reminder) => {
      this.addReminder(reminder);
    })
  }

  getReminders(): Observable<Reminder[]> {
    return this.remindersSubject;
  }

  listDay(day: Day): Observable<Reminder[]> {
    const isoDay = this.getISODay(day);
    return this.getReminders().pipe(
      map((reminders: Reminder[]) => {
        return reminders.filter((reminderEl: Reminder) => 
          this.getISOReminder(reminderEl) === isoDay
        )
      })
    )
  } 
    
  create(reminder: Partial<Reminder>): void {
    const id = this.generateUniqueId();
    const newReminder: Reminder = { 
      id,
      text: reminder.text,
      dateTime: reminder.dateTime,
      city: reminder.city,
      color: reminder.color,
    };

    this.addReminder(newReminder);
  }


  private addReminder(reminder: Reminder): void {
    const currentReminders = this.remindersSubject.value;
    const newReminders = [...currentReminders, reminder];
    this.remindersSubject.next(newReminders);

    // Schedule notification for the new reminder
    this.notificationService.scheduleNotification(reminder);
  }

  edit(updatedReminder: Reminder): void {
    const currentReminders = this.remindersSubject.value;
    const updatedReminders = currentReminders.map((reminder) =>
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    );
    this.remindersSubject.next(updatedReminders);

    // Reschedule notification for the edited reminder
    this.notificationService.cancelNotification(updatedReminder);
    this.notificationService.scheduleNotification(updatedReminder);
  }

  delete(reminderId: number): void {
    const currentReminders = this.remindersSubject.value;
    const updatedReminders = currentReminders.filter((reminder) => reminder.id !== reminderId);
    this.remindersSubject.next(updatedReminders);
    // Cancel scheduled notification for the deleted reminder if any
    this.notificationService.cancelNotification(this.getReminderById(reminderId));
  }

  private generateUniqueId(): number {
    // Replace this with a more robust unique ID generation logic if needed
    return new Date().getTime();
  }

  private getReminderById(reminderId: number): Reminder | undefined {
    return this.remindersSubject.value.find((reminder) => reminder.id === reminderId);
  }

  private getISODay(day: Day): string {
    const dayISO= day.number < 10 ? `0${day.number}` : `${day.number}`;
    const monthISO= day.monthIndex < 10 ? `0${day.monthIndex}` : `${day.monthIndex}`;

    return `${day.year}-${monthISO}-${dayISO}`
  }

  private getISOReminder(reminder: Reminder): string {
    return new Date(reminder.dateTime).toISOString().split('T')[0]
  }
  }

const MOCK_REMINDERS: Reminder[] =( [
  {
    "id": 0,
    "text": "Doctor's Appointment",
    "dateTime": "2023-11-07T10:00:00.000Z",
    "color": "#FF836D",
    "city": "New York"
  },
  {
    "id": 1,
    "text": "Meeting with Client",
    "dateTime": "2023-11-10T14:30:00.000Z",
    "color": "#D8F4EA",
    "city": "Los Angeles"
  },
  {
    "id": 2,
    "text": "Grocery Shopping",
    "dateTime": "2023-11-15T17:00:00.000Z",
    "color": "#DFDAEB",
    "city": "Chicago"
  },
  {
    "id": 3,
    "text": "Dentist Appointment",
    "dateTime": "2023-11-18T09:45:00.000Z",
    "color": "#FDEFE3",
    "city": "Houston"
  },
  {
    "id": 4,
    "text": "Family Dinner",
    "dateTime": "2023-11-22T18:30:00.000Z",
    "color": "#FF836D",
    "city": "Miami"
  },
  {
    "id": 5,
    "text": "Workshop",
    "dateTime": "2023-11-25T16:00:00.000Z",
    "color": "#D8F4EA",
    "city": "New York"
  },
  {
    "id": 6,
    "text": "Gym Session",
    "dateTime": "2023-11-29T07:00:00.000Z",
    "color": "#DFDAEB",
    "city": "Los Angeles"
  },
  {
    "id": 7,
    "text": "Movie Night",
    "dateTime": "2023-11-04T20:00:00.000Z",
    "color": "#FDEFE3"
  },
  {
    "id": 8,
    "text": "Project Deadline",
    "dateTime": "2023-11-17T23:59:00.000Z",
    "color": "#FF836D"
  },
  {
    "id": 9,
    "text": "Hiking Trip",
    "dateTime": "2023-11-30T10:00:00.000Z",
    "color": "#D8F4EA"
  },
  {
    "id": 10,
    "text": "Holiday Party",
    "dateTime": "2023-12-05T19:00:00.000Z",
    "color": "#DFDAEB",
    "city": "Chicago"
  },
  {
    "id": 11,
    "text": "Shopping for Gifts",
    "dateTime": "2023-12-12T15:30:00.000Z",
    "color": "#FDEFE3",
    "city": "Houston"
  },
  {
    "id": 12,
    "text": "Year-End Review",
    "dateTime": "2023-12-18T12:45:00.000Z",
    "color": "#FF836D",
    "city": "Miami"
  },
  {
    "id": 13,
    "text": "Winter Festival",
    "dateTime": "2023-12-22T17:15:00.000Z",
    "color": "#D8F4EA",
    "city": "New York"
  },
  {
    "id": 14,
    "text": "New Year's Eve Party",
    "dateTime": "2023-12-31T21:00:00.000Z",
    "color": "#DFDAEB",
    "city": "Los Angeles"
  }
]) as any;