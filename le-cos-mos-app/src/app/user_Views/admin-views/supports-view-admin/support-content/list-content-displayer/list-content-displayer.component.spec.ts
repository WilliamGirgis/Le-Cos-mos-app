import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContentDisplayerComponent } from './list-content-displayer.component';

describe('ListContentDisplayerComponent', () => {
  let component: ListContentDisplayerComponent;
  let fixture: ComponentFixture<ListContentDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContentDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContentDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
