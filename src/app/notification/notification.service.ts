import { Injectable } from '@angular/core';
import { Observable, Subject, scan } from 'rxjs';

export interface cammand {
  id: number;
  type: 'sucess' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  messageinput: Subject<cammand>;
  messageoutput: Observable<cammand[]>;

  constructor() {
    this.messageinput = new Subject<cammand>();
    this.messageoutput = this.messageinput.pipe(
      scan((acc: cammand[], value: cammand) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addsucess(message: string) {
    const id = this.randomid();
    this.messageinput.next({
      id,
      type: 'sucess',
      text: message,
    });
    setTimeout(() => {
      this.addClear(id);
    }, 5000);
  }
  addError(message: string) {
    const id = this.randomid();
    this.messageinput.next({
      id,
      type: 'error',
      text: message,
    });
    setTimeout(() => {
      this.addClear(id);
    }, 5000);
  }
  addClear(id: number) {
    this.messageinput.next({
      id: id,
      // id,
      type: 'clear',
    });
  }
  randomid() {
    return Math.round(Math.random() * 1000);
  }
}
