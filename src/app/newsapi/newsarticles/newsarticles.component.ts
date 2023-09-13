import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsapiService, articles } from '../newsapi.service';

@Component({
  selector: 'app-newsarticles',
  templateUrl: './newsarticles.component.html',
  styleUrls: ['./newsarticles.component.css'],
})
export class NewsarticlesComponent {
  // articles: Observable<articles[]>;
  articles!: articles[];
  numberOfPages = 0;

  constructor(private newsapi_service: NewsapiService) {
    // this.articles = new Observable();
    // this.articles = this.newsapi_service.pagesoutput;
    this.newsapi_service.pagesoutput.subscribe((res) => {
      console.log(res);
      this.articles = res;
    });
    this.newsapi_service.numberofpages.subscribe((pages) => {
      console.log(pages, 'jjjjjjjjjjjjjjjj');
      this.numberOfPages = pages;
      console.log(this.numberOfPages, 'jjjjjjjjjjjjjjjj');
    });

    this.newsapi_service.getpages(1);
  }
  onPageChanged(page: number) {
    this.newsapi_service.getpages(page);
  }
}
