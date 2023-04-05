import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsSanteBlocksComponent } from './hors-sante-blocks.component';

describe('HorsSanteBlocksComponent', () => {
  let component: HorsSanteBlocksComponent;
  let fixture: ComponentFixture<HorsSanteBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorsSanteBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorsSanteBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
