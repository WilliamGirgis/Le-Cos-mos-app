import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCmComponent } from './details-cm.component';

describe('DetailsCmComponent', () => {
  let component: DetailsCmComponent;
  let fixture: ComponentFixture<DetailsCmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
