import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransversalBlockListComponent } from './transversal-block-list.component';

describe('TransversalBlockListComponent', () => {
  let component: TransversalBlockListComponent;
  let fixture: ComponentFixture<TransversalBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransversalBlockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransversalBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
