import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTopComponent } from './router-top.component';

describe('RouterTopComponent', () => {
  let component: RouterTopComponent;
  let fixture: ComponentFixture<RouterTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
