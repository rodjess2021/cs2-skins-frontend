import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArmas } from './ver-armas';

describe('VerArmas', () => {
  let component: VerArmas;
  let fixture: ComponentFixture<VerArmas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerArmas],
    }).compileComponents();

    fixture = TestBed.createComponent(VerArmas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
