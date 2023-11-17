import { WeatherInfo } from "./weather-info";

export interface Reminder {
  id: number;
  text: string;
  dateTime: Date;
  color: string;
  city?: string
}

export interface ReminderWeather extends Reminder {
  weather?: WeatherInfo
}