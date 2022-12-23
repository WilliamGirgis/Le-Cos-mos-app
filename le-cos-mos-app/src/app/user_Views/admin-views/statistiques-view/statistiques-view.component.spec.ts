import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesViewComponent } from './statistiques-view.component';

describe('StatistiquesViewComponent', () => {
  let component: StatistiquesViewComponent;
  let fixture: ComponentFixture<StatistiquesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiquesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
