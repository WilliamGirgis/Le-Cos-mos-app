import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanchagesComponent } from './details-planchages.component';

describe('DetailsPlanchagesComponent', () => {
  let component: DetailsPlanchagesComponent;
  let fixture: ComponentFixture<DetailsPlanchagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPlanchagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPlanchagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
