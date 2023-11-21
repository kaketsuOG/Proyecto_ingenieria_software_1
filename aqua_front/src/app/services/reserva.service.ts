// reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/producto'; // Ajusta la URL de tu API

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/list`);
  }

  realizarPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/realizar-pedido`, pedido);
  }
}

export interface Producto {
  cod_producto: number;
  nombre_producto: string;
  precio_producto: number;
  // otras propiedades del producto
}

export interface Pedido {
  productos: { producto: Producto; cantidad: number }[];
  cliente: Cliente;
}

export interface Cliente {
  nombre: string;
  direccion: string;
  ciudad: string;
}
