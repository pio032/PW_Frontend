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

  // Carica le prenotazioni (dati fittizi per demo)
  caricaPrenotazioni(): void {
    this.prenotazioni = [
      {
        id: 1,
        data: '2025-07-25',
        orario: '14:30',
        note: 'Necessaria per controllo annuale, portare documenti precedenti',
        immagine: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        nomeFile: 'documento_medico.jpg',
        stato: 'pendente',
        dataRichiesta: '2025-07-20'
      },
      {
        id: 2,
        data: '2025-07-28',
        orario: '09:15',
        note: 'Prima visita, si prega di arrivare 15 minuti prima',
        immagine: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        nomeFile: 'ricetta_medica.jpg',
        stato: 'approvata',
        dataRichiesta: '2025-07-18'
      },
      {
        id: 3,
        data: '2025-07-30',
        orario: '16:45',
        note: '',
        immagine: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        nomeFile: 'camera-photo.jpg',
        stato: 'rifiutata',
        dataRichiesta: '2025-07-19'
      }
    ];
  }

  // Filtra le prenotazioni per stato
  get prenotazioniFiltrate(): Prenotazione[] {
    if (this.filtroStato === 'tutte') {
      return this.prenotazioni;
    }
    return this.prenotazioni.filter(p => p.stato === this.filtroStato);
  }

  // Cambia il filtro
  cambiaFiltro(stato: string): void {
    this.filtroStato = stato;
  }

  // Formatta la data per la visualizzazione
  formattaData(data: string): string {
    const date = new Date(data);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Formatta l'orario per la visualizzazione
  formattaOrario(orario: string): string {
    return orario;
  }

  // Ottieni la classe CSS per lo stato
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

  // Ottieni il testo dello stato
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

  // Ottieni l'icona dello stato
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

  // Elimina una prenotazione
  eliminaPrenotazione(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
      this.prenotazioni = this.prenotazioni.filter(p => p.id !== id);
    }
  }

  // Scarica l'immagine
  scaricaImmagine(immagine: string, nomeFile: string): void {
    const link = document.createElement('a');
    link.href = immagine;
    link.download = nomeFile || 'immagine.jpg';
    link.click();
  }
}
