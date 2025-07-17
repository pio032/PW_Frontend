import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: InternoAppointment[];
}

interface InternoAppointment {
  id: string;
  time: string;
  personName: string;
  company: string;
  status: 'confermata' | 'rifiutata' | 'in_attesa';
  email: string;
  phone: string;
}

@Component({
  selector: 'app-interno-calendar',
    imports: [CommonModule], // <-- Add CommonModule
  templateUrl: './interno-calendar.html',
  styleUrls: ['./interno-calendar.css']
})
export class InternoCalendarComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: string = '';
  currentYear: number = 0;
  calendarDays: CalendarDay[] = [];
  
  daysOfWeek = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
  monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  // Dati fittizi per popolare il calendario (solo appuntamenti per questo interno)
  private mockAppointments: InternoAppointment[] = [
    {
      id: '1',
      time: '09:00',
      personName: 'Mario Rossi',
      company: 'Tech Solutions SRL',
      status: 'confermata',
      email: 'mario.rossi@techsolutions.it',
      phone: '333-1234567'
    },
    {
      id: '2',
      time: '10:30',
      personName: 'Laura Bianchi',
      company: 'Digital Services SpA',
      status: 'in_attesa',
      email: 'laura.bianchi@digitalservices.com',
      phone: '339-7654321'
    },
    {
      id: '3',
      time: '14:00',
      personName: 'Giuseppe Verdi',
      company: 'Consulting Group',
      status: 'rifiutata',
      email: 'giuseppe.verdi@consulting.it',
      phone: '347-9876543'
    },
    {
      id: '4',
      time: '15:30',
      personName: 'Anna Neri',
      company: 'Innovation Lab',
      status: 'confermata',
      email: 'anna.neri@innovationlab.com',
      phone: '346-5432198'
    },
    {
      id: '5',
      time: '11:00',
      personName: 'Francesco Galli',
      company: 'External Corp',
      status: 'in_attesa',
      email: 'francesco.galli@external.com',
      phone: '338-1122334'
    },
    {
      id: '6',
      time: '16:00',
      personName: 'Stefania Blu',
      company: 'Creative Studio',
      status: 'confermata',
      email: 'stefania.blu@creative.it',
      phone: '345-5566778'
    },
    {
      id: '7',
      time: '12:15',
      personName: 'Roberto Gialli',
      company: 'Business Solutions',
      status: 'in_attesa',
      email: 'roberto.gialli@business.com',
      phone: '349-9988776'
    },
    {
      id: '8',
      time: '17:00',
      personName: 'Elena Viola',
      company: 'Marketing Plus',
      status: 'confermata',
      email: 'elena.viola@marketing.it',
      phone: '347-3344556'
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
   * Ottiene gli appuntamenti per una data specifica (solo per questo interno)
   */
  private getAppointmentsForDate(date: Date): InternoAppointment[] {
    const appointments: InternoAppointment[] = [];
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const currentMonth = this.currentDate.getMonth();
    
    // Aggiungi appuntamenti solo per il mese corrente
    if (month === currentMonth) {
      // Aggiungi appuntamenti basati sul giorno del mese
      switch (dayOfMonth) {
        case 3:
          appointments.push({...this.mockAppointments[0], time: '09:00'});
          break;
        case 5:
          appointments.push({...this.mockAppointments[1], time: '10:30'});
          break;
        case 8:
          appointments.push({...this.mockAppointments[2], time: '14:00'});
          break;
        case 10:
          appointments.push({...this.mockAppointments[3], time: '15:30'});
          break;
        case 12:
          appointments.push({...this.mockAppointments[4], time: '11:00'});
          break;
        case 15:
          appointments.push({...this.mockAppointments[5], time: '16:00'});
          break;
        case 18:
          appointments.push({...this.mockAppointments[6], time: '12:15'});
          break;
        case 20:
          appointments.push({...this.mockAppointments[7], time: '17:00'});
          break;
        case 22:
          appointments.push({...this.mockAppointments[0], time: '09:30'});
          break;
        case 25:
          appointments.push({...this.mockAppointments[1], time: '14:45'});
          break;
        case 28:
          appointments.push({...this.mockAppointments[2], time: '16:30'});
          break;
      }
      
      // Aggiungi più appuntamenti per oggi
      if (this.isToday(date)) {
        const today = new Date();
        if (today.getDate() === dayOfMonth) {
          appointments.push(
            {...this.mockAppointments[3], time: '09:00'},
            {...this.mockAppointments[4], time: '11:30'},
            {...this.mockAppointments[5], time: '15:00'}
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
    console.log('Ricaricamento calendario interno - da implementare');
    this.generateCalendar();
  }

  /**
   * Naviga alla home
   */
  goToHome(): void {
    // TODO: Implementare il routing verso la home
    this.router.navigate(['/interno','interno-home']);
    console.log('Navigazione verso home interno - da implementare');
  }
}