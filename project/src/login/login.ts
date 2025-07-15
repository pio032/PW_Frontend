import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit() {
    if (!this.username || !this.password) {
      alert('Inserisci username e password');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      console.log('Login con:', this.username, this.password);
      alert('Login tradizionale inviato!');
      this.isLoading = false;


    }, 1000);
  }

  onGoogleLogin() {

    alert('Login con Google simulato - In produzione si collegherebbe a Google OAuth');


  }

  goToOutsider() {

    window.location.href = '/outsider';


  }
}
