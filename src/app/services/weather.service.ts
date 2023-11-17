import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';

const WEATHER_URL= 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY= 'KKC28DFQLN9R5D57H57VQA9V2';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherInformation(reminder: Reminder): Observable<any> {
    if (!reminder.city || !this.isOnTarget(reminder.dateTime))  
      return of(null);  

    const city = reminder.city;
    const date = new Date(reminder.dateTime).toISOString().split('T')[0];
    return this.http.get(`${WEATHER_URL}/${city}/${date}?key=${API_KEY}`)
  }

  private isOnTarget(reminderDate: Date): boolean {
    const targetDate = new Date();
    targetDate.setDate(new Date().getDate() + 15);
    targetDate.setHours(23,59,59,59);

    return (new Date(reminderDate).getTime() < targetDate.getTime())
  }
}

