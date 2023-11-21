// reserva.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/productos'; // Ajusta la URL de tu API

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  realizarPedido(pedidoInfo: { productos: any[]; nombrePersona: string; direccionPersona: string }): void {
    const { productos, nombrePersona, direccionPersona } = pedidoInfo;

    // Cambia de const a let
    let mensaje = `¡Hola! Quiero realizar un pedido:\n`;

    productos.forEach((item) => {
      mensaje += `${item.cantidadPedido} x ${item.NOMBRE_PRODUCTO}\n`;
    });

    // Incluye la información de la persona en el mensaje
    mensaje += `Nombre: ${nombrePersona}\n`;
    mensaje += `Dirección: ${direccionPersona}\n`;

    const numeroTelefono = 'tu-numero-de-telefono';
    const url = `https://wa.me/${56930056245}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    console.log('Pedido realizado con los siguientes productos:', productos);
    console.log('Nombre de la persona:', nombrePersona);
    console.log('Dirección de entrega:', direccionPersona);
  }
}
