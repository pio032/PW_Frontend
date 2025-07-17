import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interno-home',
  templateUrl: './interno-home.html',
  styleUrls: ['./interno-home.css']
})
export class InternoHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Inizializzazione componente
  }

  /**
   * Naviga alla pagina del calendario
   */
  goToCalendar(): void {
    // TODO: Implementare il routing verso la pagina del calendario
    this.router.navigate(['/interno','interno-calendar']);
    console.log('Navigazione verso calendario interno - da implementare');
  }

  /**
   * Naviga alla pagina di accettazione/rifiuto
   */
  goToAccept(): void {
    // TODO: Implementare il routing verso la pagina di accettazione
    this.router.navigate(['/interno','interno-accept']);
    console.log('Navigazione verso accettazione prenotazioni - da implementare');
  }
}