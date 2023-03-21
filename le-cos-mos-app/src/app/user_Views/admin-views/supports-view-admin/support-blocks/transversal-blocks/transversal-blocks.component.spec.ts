import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransversalBlocksComponent } from './transversal-blocks.component';

describe('TransversalBlocksComponent', () => {
  let component: TransversalBlocksComponent;
  let fixture: ComponentFixture<TransversalBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransversalBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransversalBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
