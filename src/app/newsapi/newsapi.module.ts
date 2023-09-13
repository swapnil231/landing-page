import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsarticlesComponent } from './newsarticles/newsarticles.component';
import { TrimnewsoutletPipe } from './trimnewsoutlet.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsarticlesComponent, TrimnewsoutletPipe],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [NewsarticlesComponent],
})
export class NewsapiModule {}
