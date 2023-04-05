import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmViewComponent } from './cm-view.component';

describe('CmViewComponent', () => {
  let component: CmViewComponent;
  let fixture: ComponentFixture<CmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
