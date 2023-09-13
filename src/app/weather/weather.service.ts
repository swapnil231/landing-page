import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  mergeMap,
  switchMap,
  of,
  tap,
  catchError,
  throwError,
  share,
  retry,
} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';

interface IweatherResponse {
  current: {
    last_updated: string;
    temp_c: number;
  };
  location: {};
  forecast: {
    date: string;

    day: {
      avgtemp_c: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private http_: HttpClient,
    private notification_service: NotificationService
  ) {}

  private_url = 'http://api.weatherapi.com/v1/forecast.json';

  geolocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      Window: {
        navigator.geolocation.getCurrentPosition(
          (GeolocationPosition) => {
            observer.next(GeolocationPosition.coords);
            observer.complete();
          },
          (Error) => observer.error(Error)
        );
      }
    }).pipe(
      retry(1),
      tap(() => {
        this.notification_service.addsucess('sucess location recived');
      }),
      catchError((err) => {
        this.notification_service.addError('throw error');
        return throwError(() => err);
      })
    );
  }
  getforcast() {
    return this.geolocation().pipe(
      map((cords) => {
        return new HttpParams()
          .set('key', 'a39bfdf6e4b34238a3740158231209')
          .set('q', `${cords.latitude},${cords.longitude}`)
          .set('days', '5');
      }),
      switchMap((params) =>
        this.http_.get<IweatherResponse>(this.private_url, { params }).pipe(
          map((value) => {
            console.log(value);
            console.log(value.forecast);
            return value.forecast;
          }),
          map((value) => {
            let x;
            for (let el in value) {
              x = value[el];
            }
            console.log(x);

            return x;
          }),
          map((value: any) => {
            let x: any = [];
            value.forEach((el: any) => {
              x.push({ date: el.date, avgtemp_c: el.day.avgtemp_c });
            });
            console.log(x);
            return x;
          }),
          share()
        )
      )
    );
  }
}
