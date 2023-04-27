import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsDetailsComponent } from './stats-details.component';

describe('StatsDetailsComponent', () => {
  let component: StatsDetailsComponent;
  let fixture: ComponentFixture<StatsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
