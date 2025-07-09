import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Outsider } from './outsider';

describe('Outsider', () => {
  let component: Outsider;
  let fixture: ComponentFixture<Outsider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Outsider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Outsider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
