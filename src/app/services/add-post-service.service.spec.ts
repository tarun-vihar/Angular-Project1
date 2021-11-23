import { TestBed } from '@angular/core/testing';

import { AddPostServiceService } from './add-post-service.service';

describe('AddPostServiceService', () => {
  let service: AddPostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
