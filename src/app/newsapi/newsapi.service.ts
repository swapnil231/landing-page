import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Subject, tap, switchMap, map } from 'rxjs';

export interface newsapiresponse {
  totalResults: number;
  articles: articles[];
}

export interface articles {
  title: string;
  url: string;
  source: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NewsapiService {
  private url = 'https://newsapi.org/v2/top-headlines?';
  private pagesize = 4;
  private apiKey = '5e01087c7ac44142b0c873292e6b4439';
  private country = 'in';

  private pagesinput: Subject<number>;
  pagesoutput: Observable<articles[]>;
  numberofpages: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberofpages = new Subject();
    this.pagesinput = new Subject();

    this.pagesoutput = this.pagesinput.pipe(
      map((res) => {
        console.log(res);
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', String(this.pagesize))
          .set('page', String(res));
      }),
      switchMap((params) => {
        console.log(params);
        return this.http.get<newsapiresponse>(this.url, { params });
      }),
      tap((response) => {
        console.log(response);
        const tatalpages = Math.ceil(response.totalResults / this.pagesize);
        this.numberofpages.next(tatalpages);
        console.log(this.numberofpages, 'hiiiiiiiiiii');
      }),
      map((value) => {
        console.log(value);
        return value.articles;
      })
    );
  }
  getpages(page: number) {
    this.pagesinput.next(page);
  }
}
