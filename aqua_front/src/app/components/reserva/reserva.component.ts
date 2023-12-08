// reserva.component.ts
import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { Cliente } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  productos: any[] = [];
  displayedColumns: any[] = ['SELECCIONAR', 'NOMBRE_PRODUCTO', 'PRECIO_PRODUCTO', 'CANTIDAD_PEDIDO'];
  cantidades: number[] = [0, 1, 2, 3, 4, 5];
  nombreCliente: string = '';
  apellidoCliente: string = '';
  celularCliente: string = '';
  direccionCliente: string = '';
  ciudadCliente: string = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getProductos().subscribe((data) => {
      this.productos = data.map((producto) => ({
        ...producto,
        cantidadPedido: 0,
        seleccionado: false,
      }));
    });
  }

  resetCantidad(element: any): void {
    element.cantidadPedido = 0;
  }

  realizarPedido(): void {
    // Validación de campos vacíos
    if (this.productos.some((producto) => producto.seleccionado && producto.cantidadPedido === 0)) {
      alert('La cantidad debe ser mayor que 0 para los productos seleccionados.');
      return;
    }
    if (!this.nombreCliente || !this.apellidoCliente || !this.celularCliente || !this.direccionCliente || !this.ciudadCliente) {
      alert('Todos los campos del cliente son obligatorios.');
      return;
    }

    // Obtener solo los productos seleccionados
    const productosSeleccionados = this.productos.filter((producto) => producto.seleccionado);

    // Realizar el pedido solo si hay productos seleccionados
    if (productosSeleccionados.length > 0) {
      // Construir el objeto PedidoInfo directamente
      const pedidoInfo = {
        productos: productosSeleccionados,
        nombrePersona: this.nombreCliente,
        apellidoPersona: this.apellidoCliente,
        direccionPersona: this.direccionCliente,
        ciudadCliente: this.ciudadCliente,
      };

      // Llamar al servicio de pedido
      this.reservaService
        .realizarPedido(
          {
            nombre_cliente: this.nombreCliente,
            apellido_cliente: this.apellidoCliente,
            celular_cliente: this.celularCliente,
            direccion_cliente: this.direccionCliente,
            ciudad_cliente: this.ciudadCliente,
          },
          pedidoInfo
        )
        .subscribe({
          next: (response) => {
            // Éxito: Aquí puedes realizar acciones adicionales después de realizar el pedido
            console.log('Pedido realizado con éxito:', response);

            // Restablecer campos después de realizar el pedido
            this.nombreCliente = '';
            this.celularCliente = '';
            this.direccionCliente = '';
            this.ciudadCliente = '';
            this.apellidoCliente = '';
            this.productos.forEach((producto) => (producto.cantidadPedido = 0));
          },
          error: (error: any) => {
            // Error: Manejar el error
            console.log('Error al realizar el pedido:', error);
          },
        });
    }
  }
}