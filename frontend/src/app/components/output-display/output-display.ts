import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-output-display',
  templateUrl: './output-display.html',
  styleUrls: ['./output-display.css'],
  standalone: false,
})
export class OutputDisplay {
  @Input() result: string = '';
  @Input() loading: boolean = false;
  showToast = false;

  // IMPORTANTE: Asegurate de que diga 'private cdr: ChangeDetectorRef'
  constructor(private cdr: ChangeDetectorRef) {} 

  copyToClipboard(text: string) {
    if (!text) return;

    // Usamos la API del navegador para copiar
    navigator.clipboard.writeText(text).then(() => {
      this.showToast = true;
      
      // Le avisamos a Angular que "despierte" y dibuje el brindis
      this.cdr.detectChanges(); 

      // Programamos para que desaparezca en 2 segundos
      setTimeout(() => {
        this.showToast = false;
        this.cdr.detectChanges(); // Le avisamos de nuevo que lo oculte
      }, 2000);
      
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }
}