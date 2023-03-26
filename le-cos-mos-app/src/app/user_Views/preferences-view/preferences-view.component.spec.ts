import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesViewComponent } from './preferences-view.component';

describe('PreferencesViewComponent', () => {
  let component: PreferencesViewComponent;
  let fixture: ComponentFixture<PreferencesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
