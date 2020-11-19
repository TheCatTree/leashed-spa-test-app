import { TestBed, async, inject } from '@angular/core/testing';

import { FrontPageGuard } from './front-page.guard';

describe('FrontPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontPageGuard]
    });
  });

  it('should ...', inject([FrontPageGuard], (guard: FrontPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
