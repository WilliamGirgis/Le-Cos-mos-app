import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanteBlocksComponent } from './support-ue-list.component';

describe('SanteBlocksComponent', () => {
  let component: SanteBlocksComponent;
  let fixture: ComponentFixture<SanteBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanteBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanteBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
