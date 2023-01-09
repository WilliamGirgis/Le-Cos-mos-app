import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPublicationViewComponent } from './modify-publication-view.component';

describe('ModifyPublicationViewComponent', () => {
  let component: ModifyPublicationViewComponent;
  let fixture: ComponentFixture<ModifyPublicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPublicationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPublicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
