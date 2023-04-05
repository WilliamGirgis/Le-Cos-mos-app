import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdViewComponent } from './td-view.component';

describe('TdViewComponent', () => {
  let component: TdViewComponent;
  let fixture: ComponentFixture<TdViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
