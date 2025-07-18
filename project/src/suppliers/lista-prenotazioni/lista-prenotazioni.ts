import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Prenotazione {
  id: number;
  data: string;
  orario: string;
  note?: string;
  immagine?: string;
  nomeFile?: string;
  stato: 'pendente' | 'approvata' | 'rifiutata';
  dataRichiesta: string;
}

@Component({
  selector: 'app-lista-prenotazioni',
  templateUrl: './lista-prenotazioni.html',
  styleUrls: ['./lista-prenotazioni.css'],
  imports: [CommonModule]
})
export class ListaPrenotazioni implements OnInit {
  prenotazioni: Prenotazione[] = [];
  filtroStato: string = 'tutte';
  countApprovate: any;
  countRifiutate: any;
  countPendenti: any;

  constructor() { }

  ngOnInit(): void {
    this.caricaPrenotazioni();
  }

  caricaPrenotazioni(): void {
    this.prenotazioni = [
      {
        id: 1,
        data: '2025-07-25',
        orario: '14:30',
        note: 'Il fornitore potrebbe arrivare con qualche minuto di ritardo',
        immagine: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        nomeFile: 'foto.jpg',
        stato: 'pendente',
        dataRichiesta: '2025-07-20'
      },
      {
        id: 2,
        data: '2025-07-28',
        orario: '09:15',
        note: 'merce fragile, maneggiare con cura',
        immagine: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        nomeFile: 'foto.jpg',
        stato: 'approvata',
        dataRichiesta: '2025-07-18'
      },
      {
        id: 3,
        data: '2025-07-30',
        orario: '16:45',
        note: '',
        immagine: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        nomeFile: 'foto.jpg',
        stato: 'rifiutata',
        dataRichiesta: '2025-07-19'
      }
    ];
  }

  get prenotazioniFiltrate(): Prenotazione[] {
    if (this.filtroStato === 'tutte') {
      return this.prenotazioni;
    }
    return this.prenotazioni.filter(p => p.stato === this.filtroStato);
  }

  cambiaFiltro(stato: string): void {
    this.filtroStato = stato;
  }

  formattaData(data: string): string {
    const date = new Date(data);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formattaOrario(orario: string): string {
    return orario;
  }

  getStatoClass(stato: string): string {
    switch (stato) {
      case 'approvata':
        return 'stato-approvata';
      case 'rifiutata':
        return 'stato-rifiutata';
      default:
        return 'stato-pendente';
    }
  }

  getStatoTesto(stato: string): string {
    switch (stato) {
      case 'approvata':
        return 'Approvata';
      case 'rifiutata':
        return 'Rifiutata';
      default:
        return 'In attesa';
    }
  }

  getStatoIcon(stato: string): string {
    switch (stato) {
      case 'approvata':
        return '✅';
      case 'rifiutata':
        return '❌';
      default:
        return '⏳';
    }
  }

  eliminaPrenotazione(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
      this.prenotazioni = this.prenotazioni.filter(p => p.id !== id);
    }
  }

  scaricaImmagine(immagine: string, nomeFile: string): void {
    const link = document.createElement('a');
    link.href = immagine;
    link.download = nomeFile || 'immagine.jpg';
    link.click();
  }
}
