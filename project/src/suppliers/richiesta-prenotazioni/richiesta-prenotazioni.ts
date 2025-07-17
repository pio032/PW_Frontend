import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-richiesta-prenotazioni',
  templateUrl: './richiesta-prenotazioni.html',
  styleUrls: ['./richiesta-prenotazioni.css'],
  imports: [CommonModule]
})
export class RichiestaPrenotazioni implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  // Dati del form
  selectedDate: string = '';
  selectedTime: string = '';
  notes: string = '';
  selectedFile: File | null = null;
  capturedImage: string | null = null;

  // Stato della fotocamera
  isCameraActive: boolean = false;
  mediaStream: MediaStream | null = null;

  // Stato del form
  isFormValid: boolean = false;
  fileInput: any;

  constructor() { }

  ngOnInit(): void {
    this.checkFormValidity();
  }

  // Gestione selezione data
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.checkFormValidity();
  }

  // Gestione selezione orario
  onTimeChange(event: any): void {
    this.selectedTime = event.target.value;
    this.checkFormValidity();
  }

  // Gestione note opzionali
  onNotesChange(event: any): void {
    this.notes = event.target.value;
  }

  // Gestione selezione file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.capturedImage = null; // Reset foto scattata se viene selezionato un file
      this.checkFormValidity();
    } else {
      alert('Per favore seleziona un file immagine valido');
    }
  }

  // Avvia la fotocamera
  public async startCamera(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Usa la fotocamera posteriore
        audio: false
      });

      this.isCameraActive = true;

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

  // Scatta la foto
  capturePhoto(): void {
    if (!this.videoElement?.nativeElement || !this.canvasElement?.nativeElement) {
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        this.selectedFile = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        this.capturedImage = canvas.toDataURL('image/jpeg');
        this.stopCamera();
        this.checkFormValidity();
      }
    }, 'image/jpeg', 0.8);
  }

  // Ferma la fotocamera
  stopCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.isCameraActive = false;
  }

  // Rimuovi immagine selezionata
  removeImage(): void {
    this.selectedFile = null;
    this.capturedImage = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.checkFormValidity();
  }

  // Controlla validità del form
  checkFormValidity(): void {
    this.isFormValid = this.selectedDate !== '' &&
                     this.selectedTime !== '' &&
                     (this.selectedFile !== null || this.capturedImage !== null);
  }

  // Invia richiesta
  inviaRichiesta(): void {
    if (this.isFormValid) {
      const formData = {
        data: this.selectedDate,
        orario: this.selectedTime,
        note: this.notes,
        file: this.selectedFile,
        fotoScattata: this.capturedImage
      };

      console.log('Dati della richiesta:', formData);
      alert('Richiesta inviata con successo!');

      // Reset form dopo l'invio
      this.resetForm();
    }
  }

  // Reset del form
  resetForm(): void {
    this.selectedDate = '';
    this.selectedTime = '';
    this.notes = '';
    this.selectedFile = null;
    this.capturedImage = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.checkFormValidity();
  }

  // Cleanup quando il componente viene distrutto
  ngOnDestroy(): void {
    this.stopCamera();
  }
}
