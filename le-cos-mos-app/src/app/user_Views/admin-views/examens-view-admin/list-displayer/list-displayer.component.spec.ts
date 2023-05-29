import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisplayerComponent } from './list-displayer.component';

describe('ListDisplayerComponent', () => {
  let component: ListDisplayerComponent;
  let fixture: ComponentFixture<ListDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
