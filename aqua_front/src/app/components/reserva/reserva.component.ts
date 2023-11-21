import { Component, OnInit } from '@angular/core';
import { ReservaService, Producto, Cliente, Pedido } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  productos: Producto[] = [];
  productosSeleccionados: { producto: Producto; cantidad: number }[] = [];
  cliente: Cliente = { nombre: '', direccion: '', ciudad: '' };

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarProducto(producto: Producto): void {
    const index = this.productosSeleccionados.findIndex((p) => p.producto.cod_producto === producto.cod_producto);

    if (index === -1) {
      this.productosSeleccionados.push({ producto, cantidad: 0 });
    }
  }

  realizarPedido(): void {
    // Envía la solicitud de pedido directamente sin confirmar con la base de datos
    const pedido: Pedido = {
      productos: this.productosSeleccionados,
      cliente: this.cliente,
    };

    this.reservaService.realizarPedido(pedido).subscribe(
      (respuesta: any) => {
        console.log('Pedido realizado con éxito:', respuesta);
      },
      (error: any) => {
        console.error('Error al realizar el pedido:', error);
      }
    );
  }
}
