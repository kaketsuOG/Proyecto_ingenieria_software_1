import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class HistorialService {
    private apiUrl = 'http://localhost:3000/api/reserva'; // ajusta la URL según tu configuración
  
    constructor(private http: HttpClient) {}

    getReservas(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/list`);
    }
    getReserva(cod_reserva: any): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${cod_reserva}`);
    }

    updateReserva(cod_reserva: number, estado: string): Observable<any> {
      const url = `${this.apiUrl}/${cod_reserva}`;
  
      return this.http.put(url, { ESTADO: estado });
    }
  
  
    // Otros métodos relacionados con el historial...
  }
