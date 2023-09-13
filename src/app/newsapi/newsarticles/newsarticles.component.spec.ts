import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsarticlesComponent } from './newsarticles.component';

describe('NewsarticlesComponent', () => {
  let component: NewsarticlesComponent;
  let fixture: ComponentFixture<NewsarticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsarticlesComponent]
    });
    fixture = TestBed.createComponent(NewsarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
