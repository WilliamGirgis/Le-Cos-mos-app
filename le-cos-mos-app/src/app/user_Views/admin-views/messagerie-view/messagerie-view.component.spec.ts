import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerieViewComponent } from './messagerie-view.component';

describe('MessagerieViewComponent', () => {
  let component: MessagerieViewComponent;
  let fixture: ComponentFixture<MessagerieViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagerieViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagerieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
