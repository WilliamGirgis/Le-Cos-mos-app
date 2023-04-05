import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcercicesViewComponent } from './excercices-view.component';

describe('ExcercicesViewComponent', () => {
  let component: ExcercicesViewComponent;
  let fixture: ComponentFixture<ExcercicesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcercicesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcercicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
