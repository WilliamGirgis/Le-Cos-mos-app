import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlockListComponent } from './content-block-list.component';

describe('ContentBlockListComponent', () => {
  let component: ContentBlockListComponent;
  let fixture: ComponentFixture<ContentBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentBlockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
