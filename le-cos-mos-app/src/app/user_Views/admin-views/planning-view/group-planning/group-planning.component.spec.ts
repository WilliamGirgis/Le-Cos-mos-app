import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPlanningComponent } from './group-planning.component';

describe('GroupPlanningComponent', () => {
  let component: GroupPlanningComponent;
  let fixture: ComponentFixture<GroupPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
