import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubuleChatComponent } from './bubule-chat.component';

describe('BubuleChatComponent', () => {
  let component: BubuleChatComponent;
  let fixture: ComponentFixture<BubuleChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubuleChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubuleChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
