import { TestBed } from '@angular/core/testing';

import { LogSaveService } from './log.save.service';

describe('LogSaveService', () => {
  let service: LogSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
