import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanchageViewComponent } from './planchage-view.component';

describe('PlanchageViewComponent', () => {
  let component: PlanchageViewComponent;
  let fixture: ComponentFixture<PlanchageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanchageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanchageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
