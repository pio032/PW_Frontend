// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-outsider',
//   imports: [],
//   templateUrl: './outsider.html',
//   styleUrl: './outsider.css'
// })
// export class Outsider {

// }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-outsider',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './outsider.html',
  styleUrls: ['./outsider.css'],
})
export class OutsiderComponent implements OnInit {
  outsiderForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];
  photoPreviewUrl: string | null = null;
  showCamera = false;
  loading = false;
  successMessage = '';
  showOkMessage = false;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private stream: MediaStream | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.outsiderForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      codiceFiscale: ['', [Validators.required, Validators.maxLength(16)]],
      ragioneSociale: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      dataArrivo: ['', Validators.required],
    });

    this.outsiderForm
      .get('codiceFiscale')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const upper = value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
          this.outsiderForm
            .get('codiceFiscale')
            ?.setValue(upper, { emitEvent: false });
        }
      });
  }

  triggerUpload() {
    this.photoPreviewUrl = null;
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.photoPreviewUrl = null;
    }
  }

  async openCamera() {
    try {
      this.photoPreviewUrl = null;
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.showCamera = true;
      await this.videoElement.nativeElement.play();
    } catch (err: any) {
      alert('Impossibile accedere alla fotocamera: ' + err.message);
      console.error('Errore fotocamera:', err);
    }
  }

  capturePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          this.photoPreviewUrl = url;

          // Simulare l'upload
          const file = new File([blob], 'selfie.jpg', {
            type: 'image/jpeg',
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          this.fileInput.nativeElement.files = dataTransfer.files;
        }
      }, 'image/jpeg', 0.8);
    }
    this.closeCamera();
  }

  closeCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.showCamera = false;
  }

  onSubmit() {
    if (this.outsiderForm.invalid) {
      this.outsiderForm.markAllAsTouched();
      return;
    }

    const codiceFiscale = this.outsiderForm.get('codiceFiscale')?.value;
    if (codiceFiscale && codiceFiscale.length !== 16) {
      alert('Il codice fiscale deve essere di 16 caratteri');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    Object.entries(this.outsiderForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const file = this.fileInput.nativeElement.files?.[0];
    if (file) {
      formData.append('foto', file);
    }

    const SPRING_BOOT_ENDPOINT = 'http://localhost:8080/out/register';

    this.http.post(SPRING_BOOT_ENDPOINT, formData).subscribe({
      next: (response: any) => {
        this.successMessage =
          '🎉 Registrazione completata con successo! ID: ' +
          (response.id || 'N/A');
        this.loading = false;
        this.showOkMessage = true;
        setTimeout(() => {
          this.showOkMessage = false;
        }, 2000);
      },
      error: (error) => {
        alert(
          '❌ Errore durante la registrazione: ' +
            error.message +
            '\n\nRiprova o contatta l\'assistenza.'
        );
        this.loading = false;
      },
    });
  }
}
