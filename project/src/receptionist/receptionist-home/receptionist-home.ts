import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-home',
  templateUrl: './receptionist-home.html',
  styleUrls: ['./receptionist-home.css']
})
export class ReceptionistHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Inizializzazione componente
  }

  /**
   * Naviga alla pagina del calendario
   */
  goToCalendar(): void {
    // TODO: Implementare il routing verso la pagina del calendario
    // this.router.navigate(['/receptionist/calendar']);
    console.log('Navigazione verso calendario - da implementare');
  }

  /**
   * Naviga alla pagina dell'elenco prenotazioni
   */
  goToElenco(): void {
    // TODO: Implementare il routing verso la pagina dell'elenco
    // this.router.navigate(['/receptionist/elenco']);
    console.log('Navigazione verso elenco prenotazioni - da implementare');
  }
}