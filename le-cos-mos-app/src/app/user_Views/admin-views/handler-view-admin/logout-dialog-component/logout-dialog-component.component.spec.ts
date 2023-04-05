import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialogComponentComponent } from './logout-dialog-component.component';

describe('LogoutDialogComponentComponent', () => {
  let component: LogoutDialogComponentComponent;
  let fixture: ComponentFixture<LogoutDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
