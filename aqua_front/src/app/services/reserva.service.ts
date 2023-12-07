// reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL de tu API

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/list`);
  }

  realizarPedido(cliente: Cliente, pedidoInfo: { productos: any[]; nombrePersona: string; apellidoPersona: string; direccionPersona: string; ciudadCliente: string }): Observable<any> {
    const { productos, nombrePersona, direccionPersona, ciudadCliente } = pedidoInfo;


    
    // Ajusta la URL para realizar el pedido en tu backend
    const url = `${this.apiUrl}/reserva`;

    console.log(url)

    console.log({
      "CELULAR_CLIENTE": cliente.celular_cliente,
      "NOMBRE_CLIENTE": cliente.nombre_cliente,
      "APELLIDO_CLIENTE": cliente.apellido_cliente,
      "DIRECCION_CLIENTE": cliente.direccion_cliente,
      "CIUDAD_CLIENTE": cliente.ciudad_cliente,
   })

    // Realiza la solicitud POST al backend con la información del pedido
    return this.http.post(url, {
      "CELULAR_CLIENTE": cliente.celular_cliente,
      "NOMBRE_CLIENTE": cliente.nombre_cliente,
      "APELLIDO_CLIENTE": cliente.apellido_cliente,
      "DIRECCION_CLIENTE": cliente.direccion_cliente,
      "CIUDAD_CLIENTE": cliente.ciudad_cliente,
   }).pipe(
      tap(() => {
  

    // Cambia de const a let
    let mensaje = `¡Hola! Quiero realizar un pedido:\n`;

    productos.forEach((item) => {
      mensaje += `${item.cantidadPedido} x ${item.NOMBRE_PRODUCTO}\n`;
    });

    // Incluye la información de la persona en el mensaje
    mensaje += `Nombre: ${nombrePersona}\n`;
    mensaje += `Dirección: ${direccionPersona}\n`;
    mensaje += `Ciudad: ${ciudadCliente}\n`;
    
    const numeroTelefono = 'tu-numero-de-telefono';
    const whatsappUrl = `https://wa.me/${56976489205}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');

    console.log('Pedido realizado con los siguientes productos:', productos);
    console.log('Nombre de la persona:', nombrePersona);
    console.log('Dirección de entrega:', direccionPersona);
  })
  );
  
  }
  

}
export interface Cliente {
  nombre_cliente: string;
  apellido_cliente: string;
  celular_cliente: string;
  direccion_cliente: string;
  ciudad_cliente: string;
}

