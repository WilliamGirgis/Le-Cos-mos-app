import { TestBed } from '@angular/core/testing';

import { SaveRouteService } from './save-route.service';

describe('SaveRouteService', () => {
  let service: SaveRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
