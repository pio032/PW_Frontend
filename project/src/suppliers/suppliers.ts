import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css']
})
export class Suppliers {

  constructor(private router: Router) { }

  navigateToListaPrenotazioni(): void {
    this.router.navigate(['/listaPrenotazioni']);
  }

  navigateToRichiestaPrenotazioni(): void {
    this.router.navigate(['/richiestaPrenotazioni']);
  }
}

