import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface AppointmentRequest {
  id: string;
  time: string;
  personName: string;
  company: string;
  email: string;
  phone: string;
  status: 'confermata' | 'rifiutata' | 'in_attesa';
  photoUrl?: string;
  requestDate: Date;
}

@Component({
  selector: 'app-interno-accept',
    imports: [CommonModule], // <-- Add CommonModule
  templateUrl: './interno-accept.html',
  styleUrls: ['./interno-accept.css']
})
export class InternoAcceptComponent implements OnInit {
  currentDate: Date = new Date();
  appointmentRequests: AppointmentRequest[] = [];
  isProcessing = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  successMessage = '';
  errorMessage = '';

  // Dati fittizi per popolare le richieste di appuntamento
  private mockRequests: AppointmentRequest[] = [
    {
      id: '1',
      time: '09:00',
      personName: 'Mario Rossi',
      company: 'Tech Solutions SRL',
      email: 'mario.rossi@techsolutions.it',
      phone: '333-1234567',
      status: 'in_attesa',
      requestDate: new Date()
    },
    {
      id: '2',
      time: '10:30',
      personName: 'Laura Bianchi',
      company: 'Digital Services SpA',
      email: 'laura.bianchi@digitalservices.com',
      phone: '339-7654321',
      status: 'in_attesa',
      requestDate: new Date()
    },
    {
      id: '3',
      time: '11:15',
      personName: 'Giuseppe Verdi',
      company: 'Consulting Group',
      email: 'giuseppe.verdi@consulting.it',
      phone: '347-9876543',
      status: 'confermata',
      requestDate: new Date()
    },
    {
      id: '4',
      time: '14:00',
      personName: 'Anna Neri',
      company: 'Innovation Lab',
      email: 'anna.neri@innovationlab.com',
      phone: '346-5432198',
      status: 'in_attesa',
      requestDate: new Date()
    },
    {
      id: '5',
      time: '14:45',
      personName: 'Francesco Galli',
      company: 'External Corp',
      email: 'francesco.galli@external.com',
      phone: '338-1122334',
      status: 'rifiutata',
      requestDate: new Date()
    },
    {
      id: '6',
      time: '15:30',
      personName: 'Stefania Blu',
      company: 'Creative Studio',
      email: 'stefania.blu@creative.it',
      phone: '345-5566778',
      status: 'in_attesa',
      requestDate: new Date()
    },
    {
      id: '7',
      time: '16:00',
      personName: 'Roberto Gialli',
      company: 'Business Solutions',
      email: 'roberto.gialli@business.com',
      phone: '349-9988776',
      status: 'in_attesa',
      requestDate: new Date()
    },
    {
      id: '8',
      time: '16:45',
      personName: 'Elena Viola',
      company: 'Marketing Plus',
      email: 'elena.viola@marketing.it',
      phone: '347-3344556',
      status: 'confermata',
      requestDate: new Date()
    },
    {
      id: '9',
      time: '17:15',
      personName: 'Luca Marrone',
      company: 'Software House',
      email: 'luca.marrone@software.com',
      phone: '348-7788990',
      status: 'in_attesa',
      requestDate: new Date()
    },
    {
      id: '10',
      time: '17:45',
      personName: 'Chiara Azzurri',
      company: 'Design Agency',
      email: 'chiara.azzurri@design.it',
      phone: '349-1122445',
      status: 'in_attesa',
      requestDate: new Date()
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAppointmentRequests();
  }

  /**
   * Carica le richieste di appuntamento
   */
  loadAppointmentRequests(): void {
    // Simula il caricamento dei dati dal backend
    this.appointmentRequests = [...this.mockRequests]
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  /**
   * Accetta una richiesta di appuntamento
   */
  async acceptRequest(request: AppointmentRequest): Promise<void> {
    this.isProcessing = true;
    this.hideMessages();

    try {
      // Simula una chiamata al backend
      await this.simulateBackendCall();

      // Aggiorna lo stato della richiesta
      const index = this.appointmentRequests.findIndex(r => r.id === request.id);
      if (index !== -1) {
        this.appointmentRequests[index].status = 'confermata';
      }

      this.showSuccess(`Appuntamento con ${request.personName} accettato con successo!`);
    } catch (error) {
      this.showError('Errore durante l\'accettazione dell\'appuntamento. Riprova.');
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Rifiuta una richiesta di appuntamento
   */
  async rejectRequest(request: AppointmentRequest): Promise<void> {
    this.isProcessing = true;
    this.hideMessages();

    try {
      // Simula una chiamata al backend
      await this.simulateBackendCall();

      // Aggiorna lo stato della richiesta
      const index = this.appointmentRequests.findIndex(r => r.id === request.id);
      if (index !== -1) {
        this.appointmentRequests[index].status = 'rifiutata';
      }

      this.showSuccess(`Appuntamento con ${request.personName} rifiutato.`);
    } catch (error) {
      this.showError('Errore durante il rifiuto dell\'appuntamento. Riprova.');
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Cambia la decisione su una richiesta già processata
   */
  async changeDecision(request: AppointmentRequest): Promise<void> {
    this.isProcessing = true;
    this.hideMessages();

    try {
      // Simula una chiamata al backend
      await this.simulateBackendCall();

      // Reimposta lo stato a "in_attesa"
      const index = this.appointmentRequests.findIndex(r => r.id === request.id);
      if (index !== -1) {
        this.appointmentRequests[index].status = 'in_attesa';
      }

      this.showSuccess(`Decisione per ${request.personName} rimessa in attesa.`);
    } catch (error) {
      this.showError('Errore durante il cambio di decisione. Riprova.');
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Ottiene il testo dello status in italiano
   */
  getStatusText(status: string): string {
    switch (status) {
      case 'confermata':
        return 'Confermato';
      case 'rifiutata':
        return 'Rifiutato';
      case 'in_attesa':
        return 'In Attesa';
      default:
        return 'Sconosciuto';
    }
  }

  /**
   * Ricarica le richieste di appuntamento
   */
  refreshRequests(): void {
    // TODO: Implementare la ricarica dei dati dal backend
    console.log('Ricaricamento richieste appuntamento - da implementare');
    this.loadAppointmentRequests();
    this.showSuccess('Richieste aggiornate con successo!');
  }

  /**
   * Naviga alla home
   */
  goToHome(): void {
    // TODO: Implementare il routing verso la home
    this.router.navigate(['/interno','interno-home']);
    console.log('Navigazione verso home interno - da implementare');
  }

  /**
   * Simula una chiamata al backend
   */
  private simulateBackendCall(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simula successo nel 95% dei casi
        if (Math.random() > 0.05) {
          resolve();
        } else {
          reject(new Error('Errore simulato'));
        }
      }, 1000);
    });
  }

  /**
   * Mostra un messaggio di successo
   */
  private showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => this.hideMessages(), 3000);
  }

  /**
   * Mostra un messaggio di errore
   */
  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorMessage = true;
    setTimeout(() => this.hideMessages(), 3000);
  }

  /**
   * Nasconde tutti i messaggi
   */
  private hideMessages(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }
}