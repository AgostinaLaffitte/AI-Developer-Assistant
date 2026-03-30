import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiApiService {
  // La URL de tu servidor Node.js que ya probamos con el .http
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Método genérico para hablar con el backend
   * @param endpoint puede ser 'improve-text', 'explain-code' o 'generate-tests'
   */
  processRequest(endpoint: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, payload);
  }
}