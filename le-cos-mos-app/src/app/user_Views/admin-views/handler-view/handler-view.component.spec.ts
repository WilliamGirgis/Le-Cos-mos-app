import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerViewComponent } from './handler-view.component';

describe('HandlerViewComponent', () => {
  let component: HandlerViewComponent;
  let fixture: ComponentFixture<HandlerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandlerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
