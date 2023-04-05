import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTop2Component } from './router-top2.component';

describe('RouterTop2Component', () => {
  let component: RouterTop2Component;
  let fixture: ComponentFixture<RouterTop2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterTop2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterTop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
