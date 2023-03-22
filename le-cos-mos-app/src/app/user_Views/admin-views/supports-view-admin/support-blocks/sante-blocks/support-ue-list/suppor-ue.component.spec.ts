import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporUEComponent } from './suppor-ue.component';

describe('SupporUEComponent', () => {
  let component: SupporUEComponent;
  let fixture: ComponentFixture<SupporUEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupporUEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupporUEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
