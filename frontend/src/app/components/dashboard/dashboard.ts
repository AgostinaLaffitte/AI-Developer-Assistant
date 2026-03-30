import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <--- IMPORTANTE: Agregado
import { AiApiService } from '../../services/ia-api_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false,
})
export class Dashboard implements OnInit { // <--- Agregado "implements OnInit"
  
  aiResult: string = '';
  isLoading: boolean = false;
  history: any[] = [];
 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aiService: AiApiService // <--- INYECTADO: Ahora 'this.aiService' funcionará
  ) {
    // El constructor ahora ya tiene las herramientas necesarias
  }

  ngOnInit() {
    // Solo ejecutamos esto si estamos en el navegador para evitar errores de SSR
    if (isPlatformBrowser(this.platformId)) {
      const savedHistory = localStorage.getItem('codespark_history');
      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
      }
    }
  }

  handleAiRequest(data: {type: string, text: string}) {
    this.isLoading = true;
    this.aiResult = ''; 

    let endpoint = '';
    const payload: any = { filters: { language: 'español' } };

    // Mapeo de tipos a endpoints del Backend
    if (data.type === 'editor') {
      endpoint = 'improve-text';
      payload.text = data.text;
    } else {
      endpoint = data.type === 'tutor' ? 'explain-code' : 'generate-tests';
      payload.code = data.text;
    }

    // Llamada al servicio
    this.aiService.processRequest(endpoint, payload).subscribe({
      next: (response: any) => {
        this.aiResult = response.result;
        this.isLoading = false;
        this.saveToHistory(data.type, data.text, response.result);
      },
      error: (err) => {
        this.isLoading = false;
        
        if (err.status === 0) {
          this.aiResult = "⚠️ Error de conexión: El servidor no responde. ¿Olvidaste encender el Backend?";
        } else if (err.status === 429) {
          this.aiResult = "⏳ Demasiadas peticiones. Espera un minuto.";
        } else if (err.status === 500) {
          this.aiResult = "💥 Error interno de la IA: El servidor tuvo un problema.";
        } else {
          this.aiResult = "❌ Ocurrió un error inesperado.";
        }
      }
    });
  }

  saveToHistory(type: string, input: string, output: string) {
    const newItem = {
      id: Date.now(),
      type: type,
      title: input.substring(0, 30) + '...',
      fullInput: input,
      fullOutput: output,
      date: new Date()
    };

    this.history.unshift(newItem);
    
    if (this.history.length > 10) this.history.pop();

    // Guardamos en el navegador con chequeo de plataforma para seguridad
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('codespark_history', JSON.stringify(this.history));
    }
  }

  loadFromHistory(item: any) {
    this.aiResult = item.fullOutput;
  }
 
}