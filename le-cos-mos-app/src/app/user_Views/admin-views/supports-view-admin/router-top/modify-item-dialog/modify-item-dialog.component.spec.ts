import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyItemDialogComponent } from './modify-item-dialog.component';

describe('ModifyItemDialogComponent', () => {
  let component: ModifyItemDialogComponent;
  let fixture: ComponentFixture<ModifyItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
