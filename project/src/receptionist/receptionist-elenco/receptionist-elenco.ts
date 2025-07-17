import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TodayAppointment {
  id: string;
  time: string;
  personName: string;
  company: string;
  internalReference: string;
  status: 'confermata' | 'rifiutata' | 'in_attesa';
  photoUrl?: string;
}

@Component({
  selector: 'app-receptionist-elenco',
    imports: [CommonModule, DatePipe], // <-- Add CommonModule and DatePipe
  templateUrl: './receptionist-elenco.html',
  styleUrls: ['./receptionist-elenco.css'],
  providers: [DatePipe] // <-- Add this line
})
export class ReceptionistElencoComponent implements OnInit {
  currentDate: Date = new Date();
  todayAppointments: TodayAppointment[] = [];

  // Dati fittizi per popolare l'elenco
  private mockTodayAppointments: TodayAppointment[] = [
    {
      id: '1',
      time: '09:00',
      personName: 'Mario Rossi',
      company: 'Tech Solutions SRL',
      internalReference: 'Ing. Giovanni Bianchi',
      status: 'confermata'
    },
    {
      id: '2',
      time: '09:30',
      personName: 'Laura Bianchi',
      company: 'Digital Services SpA',
      internalReference: 'Dott.ssa Maria Verdi',
      status: 'confermata'
    },
    {
      id: '3',
      time: '10:15',
      personName: 'Giuseppe Verdi',
      company: 'Consulting Group',
      internalReference: 'Ing. Paolo Neri',
      status: 'rifiutata'
    },
    {
      id: '4',
      time: '11:00',
      personName: 'Anna Neri',
      company: 'Innovation Lab',
      internalReference: 'Dott. Francesco Blu',
      status: 'confermata'
    },
    {
      id: '5',
      time: '11:30',
      personName: 'Francesco Galli',
      company: 'External Corp',
      internalReference: 'Ing. Stefania Rosa',
      status: 'in_attesa'
    },
    {
      id: '6',
      time: '14:00',
      personName: 'Stefania Blu',
      company: 'Creative Studio',
      internalReference: 'Dott. Roberto Giallo',
      status: 'confermata'
    },
    {
      id: '7',
      time: '14:30',
      personName: 'Roberto Gialli',
      company: 'Business Solutions',
      internalReference: 'Ing. Elena Viola',
      status: 'confermata'
    },
    {
      id: '8',
      time: '15:15',
      personName: 'Elena Viola',
      company: 'Marketing Plus',
      internalReference: 'Dott.ssa Chiara Azzurri',
      status: 'confermata'
    },
    {
      id: '9',
      time: '16:00',
      personName: 'Luca Marrone',
      company: 'Software House',
      internalReference: 'Ing. Andrea Grigi',
      status: 'in_attesa'
    },
    {
      id: '10',
      time: '16:45',
      personName: 'Chiara Azzurri',
      company: 'Design Agency',
      internalReference: 'Dott. Marco Arancioni',
      status: 'confermata'
    },
    {
      id: '11',
      time: '17:12',
      personName: 'Marco Arancioni',
      company: 'Web Development',
      internalReference: 'Ing. Silvia Verdi',
      status: 'rifiutata'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTodayAppointments();
  }

  /**
   * Carica le prenotazioni di oggi
   */
  loadTodayAppointments(): void {
    // Simula il caricamento dei dati dal backend
    this.todayAppointments = [...this.mockTodayAppointments]
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  /**
   * Ottiene il testo dello status in italiano
   */
  getStatusText(status: string): string {
    switch (status) {
      case 'confermata':
        return 'Confermata';
      case 'rifiutata':
        return 'Rifiutata';
      case 'in_attesa':
        return 'In Attesa';
      default:
        return 'Sconosciuto';
    }
  }

  /**
   * Ricarica l'elenco delle prenotazioni
   */
  refreshElenco(): void {
    // TODO: Implementare la ricarica dei dati dal backend
    console.log('Ricaricamento elenco prenotazioni - da implementare');
    this.loadTodayAppointments();
  }

  /**
   * Naviga alla home
   */
  goToHome(): void {
    // TODO: Implementare il routing verso la home
    // this.router.navigate(['/receptionist/home']);
    console.log('Navigazione verso home - da implementare');
  }
}