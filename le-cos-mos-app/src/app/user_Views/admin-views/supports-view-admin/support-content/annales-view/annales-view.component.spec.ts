import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnalesViewComponent } from './annales-view.component';

describe('AnnalesViewComponent', () => {
  let component: AnnalesViewComponent;
  let fixture: ComponentFixture<AnnalesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnalesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnalesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
