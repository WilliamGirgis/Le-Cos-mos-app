import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensViewComponent } from './examens-view.component';

describe('ExamensViewComponent', () => {
  let component: ExamensViewComponent;
  let fixture: ComponentFixture<ExamensViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamensViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamensViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
