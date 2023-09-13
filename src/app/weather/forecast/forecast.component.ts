import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent {
  forecastdata: any = [];
  constructor(private weather_service: WeatherService) {
    this.weather_service.getforcast().subscribe((weatherresponse) => {
      this.forecastdata = weatherresponse;
      console.log('weatherresponse', weatherresponse);
    });
    // this.weather_service.geolocation().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
