import { Component, OnInit } from '@angular/core';
import { NotificationService, cammand } from '../notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  message: Observable<cammand[]>;

  constructor(private notification_service: NotificationService) {
    this.message = this.notification_service.messageoutput;

    // setInterval(() => {
    //   this.notification_service.addsucess('it errorly wrong');
    // }, 2000);
  }
  ngOnInit(): void {}

  ondelete(id: number) {
    this.notification_service.addClear(id);
  }
}
