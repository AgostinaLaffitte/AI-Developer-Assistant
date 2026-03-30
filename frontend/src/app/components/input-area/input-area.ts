import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.html',
  styleUrls: ['./input-area.css'],
  standalone: false,
})
export class InputArea {
  // Variables que se conectan con el HTML (usando [(ngModel)])
  userInput: string = '';
  selectedType: string = 'editor';

  // Este "grito" (Output) le avisa al Dashboard que el usuario hizo clic en enviar
  @Output() onSend = new EventEmitter<{type: string, text: string}>();

  // Función que se ejecuta al presionar el botón
  sendToAi() {
    if (this.userInput.trim()) {
      this.onSend.emit({
        type: this.selectedType,
        text: this.userInput
      });
      //  limpiar el área después de enviar
      this.userInput = ''; 
    } else {
      alert("Por favor, escribe algo primero.");
    }
  }
}