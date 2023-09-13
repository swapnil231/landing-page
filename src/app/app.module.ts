import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './notification/notification.module';
import { NewsapiModule } from './newsapi/newsapi.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WeatherModule,
    NotificationModule,
    NewsapiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
