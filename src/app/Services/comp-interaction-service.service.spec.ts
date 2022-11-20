import { TestBed } from '@angular/core/testing';

import { CompInteractionServiceService } from './comp-interaction-service.service';

describe('CompInteractionServiceService', () => {
  let service: CompInteractionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompInteractionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
