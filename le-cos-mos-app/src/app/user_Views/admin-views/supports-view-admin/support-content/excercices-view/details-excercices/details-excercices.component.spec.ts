import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExcercicesComponent } from './details-excercices.component';

describe('DetailsExcercicesComponent', () => {
  let component: DetailsExcercicesComponent;
  let fixture: ComponentFixture<DetailsExcercicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsExcercicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsExcercicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
