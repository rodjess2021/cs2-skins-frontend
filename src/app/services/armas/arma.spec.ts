import { TestBed } from '@angular/core/testing';

import { Arma } from './arma';

describe('Arma', () => {
  let service: Arma;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arma);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
