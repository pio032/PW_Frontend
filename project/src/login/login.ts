import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  // Credenziali predefinite
  private validCredentials: { [key: string]: { password: string; role: string } } = {
    'int': { password: 'int', role: 'interno' },
    'rec': { password: 'rec', role: 'receptionist' },
    'sup': { password: 'sup', role: 'suppliers' }
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      alert('Inserisci username e password');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      // Verifica delle credenziali
      const userCredentials = this.validCredentials[this.username.toLowerCase()];
      
      if (userCredentials && userCredentials.password === this.password) {
        // Login riuscito
        console.log('Login riuscito per:', this.username, 'Ruolo:', userCredentials.role);
        
        // Qui implementare il routing basato sul ruolo
        this.redirectToUserPage(userCredentials.role);
        
      } else {
        // Login fallito
        console.log('Login fallito per:', this.username);
        alert('Username o password non corretti');
      }
      
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Reindirizza l'utente alla pagina appropriata in base al ruolo
   */
  private redirectToUserPage(role: string): void {
    switch (role) {
      case 'interno':
        // TODO: Implementare routing per interno
        this.router.navigate(['/interno','interno-home']);
        console.log('Reindirizzamento a pagina interno - da implementare');
        break;
        
      case 'receptionist':
        // TODO: Implementare routing per receptionist
        this.router.navigate(['/receptionist','receptionist-home']);
        console.log('Reindirizzamento a pagina receptionist - da implementare');
        break;
        
      case 'suppliers':
        // TODO: Implementare routing per suppliers
        this.router.navigate(['/suppliers']);
        console.log('Reindirizzamento a pagina suppliers - da implementare');
        break;
        
      default:
        console.error('Ruolo non riconosciuto:', role);
        alert('Errore nel sistema. Contatta l\'amministratore.');
    }
  }

  onGoogleLogin() {
    // Simula login con Google
    alert('Login con Google simulato - In produzione si collegherebbe a Google OAuth');
  }

  goToOutsider() {
    // TODO: Implementare routing per outsider
    this.router.navigate(['/outsider']);
  }
}