import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHandlerComponent } from './support-handler.component';

describe('SupportHandlerComponent', () => {
  let component: SupportHandlerComponent;
  let fixture: ComponentFixture<SupportHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
