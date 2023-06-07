import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyPlanningComponent } from './readonly-planning.component';

describe('ReadonlyPlanningComponent', () => {
  let component: ReadonlyPlanningComponent;
  let fixture: ComponentFixture<ReadonlyPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadonlyPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadonlyPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
