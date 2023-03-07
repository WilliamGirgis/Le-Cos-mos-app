import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportsViewComponent } from './supports-view.component';

describe('SupportsViewComponent', () => {
  let component: SupportsViewComponent;
  let fixture: ComponentFixture<SupportsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
