import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTdComponent } from './details-td.component';

describe('DetailsTdComponent', () => {
  let component: DetailsTdComponent;
  let fixture: ComponentFixture<DetailsTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
