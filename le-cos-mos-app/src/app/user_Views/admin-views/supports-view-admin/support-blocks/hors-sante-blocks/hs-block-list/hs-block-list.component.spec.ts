import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsBlockListComponent } from './hs-block-list.component';

describe('HsBlockListComponent', () => {
  let component: HsBlockListComponent;
  let fixture: ComponentFixture<HsBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HsBlockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HsBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
