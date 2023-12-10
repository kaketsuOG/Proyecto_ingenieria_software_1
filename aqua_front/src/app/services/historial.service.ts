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
    
    getMasVendido(fechaInicio: string, fechaFinal: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/reporte/masvendido`, { fecha_inicio: fechaInicio, fecha_final: fechaFinal });
    }

    getVentaMes(fechaInicio: string, fechaFinal: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/reporte/ventaspormes`, { fecha_inicio: fechaInicio, fecha_final: fechaFinal });
    }

    getVentaDia(fechaInicio: string, fechaFinal: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/reporte/diamasvendido`, { fecha_inicio: fechaInicio, fecha_final: fechaFinal });
    }
  
    // Otros métodos relacionados con el historial...
  }
