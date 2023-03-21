import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLectureComponent } from './display-lecture.component';

describe('DisplayLectureComponent', () => {
  let component: DisplayLectureComponent;
  let fixture: ComponentFixture<DisplayLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLectureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
