import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: Appointment[];
}

interface Appointment {
  id: string;
  time: string;
  title: string;
  type: 'interno' | 'esterno';
  status: 'confermata' | 'rifiutata' | 'in_attesa';
  personName: string;
  company: string;
}

@Component({
  selector: 'app-receptionist-calendar',
    imports: [CommonModule], // <-- Add CommonModule
  templateUrl: './receptionist-calendar.html',
  styleUrls: ['./receptionist-calendar.css']
})
export class ReceptionistCalendarComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: string = '';
  currentYear: number = 0;
  calendarDays: CalendarDay[] = [];
  
  daysOfWeek = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
  monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  // Dati fittizi per popolare il calendario
  private mockAppointments: Appointment[] = [
    {
      id: '1',
      time: '09:00',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'confermata',
      personName: 'Mario Rossi',
      company: 'Tech Solutions SRL'
    },
    {
      id: '2',
      time: '10:30',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'confermata',
      personName: 'Laura Bianchi',
      company: 'Digital Services SpA'
    },
    {
      id: '3',
      time: '14:00',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'rifiutata',
      personName: 'Giuseppe Verdi',
      company: 'Consulting Group'
    },
    {
      id: '4',
      time: '15:30',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'confermata',
      personName: 'Anna Neri',
      company: 'Innovation Lab'
    },
    {
      id: '5',
      time: '11:00',
      title: 'Prenotazione per interno',
      type: 'esterno',
      status: 'confermata',
      personName: 'Francesco Galli',
      company: 'External Corp'
    },
    {
      id: '6',
      time: '16:00',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'confermata',
      personName: 'Stefania Blu',
      company: 'Creative Studio'
    },
    {
      id: '7',
      time: '12:15',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'confermata',
      personName: 'Roberto Gialli',
      company: 'Business Solutions'
    },
    {
      id: '8',
      time: '17:00',
      title: 'Prenotazione per interno',
      type: 'interno',
      status: 'confermata',
      personName: 'Elena Viola',
      company: 'Marketing Plus'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  /**
   * Genera il calendario per il mese corrente
   */
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    this.currentMonth = this.monthNames[month];
    this.currentYear = year;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // Inizia dalla domenica della settimana del primo giorno
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // Termina al sabato della settimana dell'ultimo giorno
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    this.calendarDays = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const day: CalendarDay = {
        day: currentDate.getDate(),
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: this.isToday(currentDate),
        appointments: this.getAppointmentsForDate(currentDate)
      };
      
      this.calendarDays.push(day);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  /**
   * Verifica se una data è oggi
   */
  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Ottiene gli appuntamenti per una data specifica
   */
  private getAppointmentsForDate(date: Date): Appointment[] {
    // Simula appuntamenti casuali per alcune date
    const appointments: Appointment[] = [];
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const currentMonth = this.currentDate.getMonth();
    
    // Aggiungi appuntamenti solo per il mese corrente
    if (month === currentMonth) {
      // Aggiungi appuntamenti basati sul giorno del mese
      switch (dayOfMonth) {
        case 2:
          appointments.push({...this.mockAppointments[0], time: '12:34'});
          break;
        case 6:
          appointments.push({...this.mockAppointments[1], time: '18:44'});
          break;
        case 8:
          appointments.push({...this.mockAppointments[2], time: '12:55'});
          break;
        case 9:
          appointments.push({...this.mockAppointments[3], time: '13:51'});
          break;
        case 10:
          appointments.push({...this.mockAppointments[4], time: '10:00'});
          break;
        case 16:
          appointments.push({...this.mockAppointments[5], time: '17:12'});
          break;
        case 17:
          appointments.push({...this.mockAppointments[6], time: '12:12'});
          break;
        case 18:
          appointments.push({...this.mockAppointments[7], time: '12:12'});
          break;
        case 22:
          appointments.push({...this.mockAppointments[0], time: '17:12'});
          break;
        case 23:
          appointments.push({...this.mockAppointments[1], time: '12:53'});
          break;
        case 24:
          appointments.push({...this.mockAppointments[2], time: '12:34'});
          break;
        case 30:
          appointments.push({...this.mockAppointments[3], time: '20:21'});
          break;
      }
      
      // Aggiungi più appuntamenti per oggi
      if (this.isToday(date)) {
        const today = new Date();
        if (today.getDate() === dayOfMonth) {
          appointments.push(
            {...this.mockAppointments[4], time: '09:30'},
            {...this.mockAppointments[5], time: '14:15'},
            {...this.mockAppointments[6], time: '16:45'}
          );
        }
      }
    }
    
    // Ordina per orario
    return appointments.sort((a, b) => a.time.localeCompare(b.time));
  }

  /**
   * Naviga al mese precedente
   */
  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  /**
   * Naviga al mese successivo
   */
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  /**
   * Torna al mese corrente
   */
  goToToday(): void {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  /**
   * Ricarica il calendario
   */
  refreshCalendar(): void {
    // TODO: Implementare la ricarica dei dati dal backend
    console.log('Ricaricamento calendario - da implementare');
    this.generateCalendar();
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