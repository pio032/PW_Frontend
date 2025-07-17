import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaPrenotazioni } from './richiesta-prenotazioni';

describe('RichiestaPrenotazioni', () => {
  let component: RichiestaPrenotazioni;
  let fixture: ComponentFixture<RichiestaPrenotazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichiestaPrenotazioni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichiestaPrenotazioni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
