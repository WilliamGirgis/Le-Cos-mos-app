import { TestBed } from '@angular/core/testing';

import { FileObserverService } from './file-observer.service';

describe('FileObserverService', () => {
  let service: FileObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
