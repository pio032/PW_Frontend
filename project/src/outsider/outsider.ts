import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outsider',
  templateUrl: './outsider.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./outsider.css']
})
export class Outsider implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  outsiderForm: FormGroup;
  isCameraActive = false;
  selectedPhoto: string | null = null;
  photoFile: File | null = null;
  mediaStream: MediaStream | null = null;
  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.outsiderForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      codiceFiscale: ['', [Validators.required, this.codiceFiscaleValidator]],
      ragioneSociale: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      dataArrivo: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Inizializzazione componente
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  /**
   * Validatore personalizzato per il codice fiscale italiano
   */
  codiceFiscaleValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    // Regex per codice fiscale italiano
    const codiceFiscaleRegex = /^[A-Z]{6}[0-9]{2}[A-EHLMPR-T][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
    
    if (!codiceFiscaleRegex.test(value.toUpperCase())) {
      return { invalidCodiceFiscale: true };
    }

    return null;
  }

  /**
   * Verifica se un campo è invalido e è stato toccato
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.outsiderForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Avvia la fotocamera
   */
  async startCamera(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });

      this.isCameraActive = true;
      
      // Aspetta che il DOM sia aggiornato
      setTimeout(() => {
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.mediaStream;
        }
      }, 100);
    } catch (error) {
      console.error('Errore nell\'accesso alla fotocamera:', error);
      alert('Impossibile accedere alla fotocamera. Assicurati di aver dato i permessi necessari.');
    }
  }

  /**
   * Ferma la fotocamera
   */
  stopCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.isCameraActive = false;
  }

  /**
   * Scatta una foto utilizzando la fotocamera
   */
  capturePhoto(): void {
    if (!this.videoElement?.nativeElement || !this.canvasElement?.nativeElement) {
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Imposta le dimensioni del canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Disegna il frame corrente del video sul canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converti il canvas in blob e poi in data URL
    canvas.toBlob((blob) => {
      if (blob) {
        this.photoFile = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        this.selectedPhoto = canvas.toDataURL('image/jpeg');
        this.outsiderForm.patchValue({ foto: 'camera-photo.jpg' });
        this.stopCamera();
      }
    }, 'image/jpeg', 0.8);
  }

  /**
   * Gestisce la selezione di un file
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Verifica che sia un'immagine
      if (file.type.startsWith('image/')) {
        this.photoFile = file;
        
        // Crea un'anteprima dell'immagine
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedPhoto = e.target?.result as string;
          this.outsiderForm.patchValue({ foto: file.name });
        };
        reader.readAsDataURL(file);
      } else {
        alert('Seleziona un file immagine valido.');
      }
    }
  }

  /**
   * Rimuove la foto selezionata
   */
  removePhoto(): void {
    this.selectedPhoto = null;
    this.photoFile = null;
    this.outsiderForm.patchValue({ foto: '' });
  }

  /**
   * Invia il form
   */
  async onSubmit(): Promise<void> {
    if (this.outsiderForm.valid && this.photoFile) {
      this.isSubmitting = true;
      this.showSuccessMessage = false;
      this.showErrorMessage = false;

      try {
        // Prepara i dati per l'invio
        const formData = {
          nome: this.outsiderForm.get('nome')?.value,
          cognome: this.outsiderForm.get('cognome')?.value,
          codiceFiscale: this.outsiderForm.get('codiceFiscale')?.value.toUpperCase(),
          ragioneSociale: this.outsiderForm.get('ragioneSociale')?.value,
          email: this.outsiderForm.get('email')?.value,
          telefono: this.outsiderForm.get('telefono')?.value,
          dataArrivo: this.outsiderForm.get('dataArrivo')?.value,
          foto: this.photoFile ? await this.fileToBase64(this.photoFile) : null
        };

        console.log('Dati da inviare al backend:', formData);

        // TODO: Implementare la chiamata al backend
        // await this.backendService.registraOutsider(formData);

        // Simula una chiamata al backend
        await this.simulateBackendCall();

        this.showSuccessMessage = true;
        this.resetForm();
      } catch (error) {
        console.error('Errore durante la registrazione:', error);
        this.showErrorMessage = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Marca tutti i campi come toccati per mostrare gli errori
      this.markAllFieldsAsTouched();
    }
  }

  /**
   * Converte un file in base64
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Simula una chiamata al backend
   */
  private simulateBackendCall(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simula successo nel 90% dei casi
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Errore simulato'));
        }
      }, 2000);
    });
  }

  /**
   * Marca tutti i campi come toccati
   */
  private markAllFieldsAsTouched(): void {
    Object.keys(this.outsiderForm.controls).forEach(key => {
      this.outsiderForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Reset del form
   */
  private resetForm(): void {
    this.outsiderForm.reset();
    this.removePhoto();
    this.stopCamera();
  }

  /**
   * Naviga alla home page
   */
  goToHome(): void {
    // TODO: Implementare il routing verso la home page
    // this.router.navigate(['/home']);
    console.log('Navigazione verso home page - da implementare');
  }
}