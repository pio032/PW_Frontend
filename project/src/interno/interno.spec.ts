import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interno } from './interno';

describe('Interno', () => {
  let component: Interno;
  let fixture: ComponentFixture<Interno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Interno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Interno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
