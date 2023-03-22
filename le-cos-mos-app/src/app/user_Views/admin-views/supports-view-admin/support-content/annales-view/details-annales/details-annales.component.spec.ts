import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnnalesComponent } from './details-annales.component';

describe('DetailsAnnalesComponent', () => {
  let component: DetailsAnnalesComponent;
  let fixture: ComponentFixture<DetailsAnnalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAnnalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAnnalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
