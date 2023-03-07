import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBlocksComponent } from './support-blocks.component';

describe('SupportBlocksComponent', () => {
  let component: SupportBlocksComponent;
  let fixture: ComponentFixture<SupportBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
