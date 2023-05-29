import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrainementViewComponent } from './entrainement-view.component';

describe('EntrainementViewComponent', () => {
  let component: EntrainementViewComponent;
  let fixture: ComponentFixture<EntrainementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrainementViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrainementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
