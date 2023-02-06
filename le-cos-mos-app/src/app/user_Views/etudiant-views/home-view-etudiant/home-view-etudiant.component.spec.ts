import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewEtudiantComponent } from './home-view-etudiant.component';

describe('HomeViewEtudiantComponent', () => {
  let component: HomeViewEtudiantComponent;
  let fixture: ComponentFixture<HomeViewEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeViewEtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeViewEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
