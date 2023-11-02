import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private inventario: any[] = [
    {
      CODIGO_PRODUCTO : "1",
      NOMBRE_PRODUCTO: "AGUA 25 LITROS",
      PRECIO_PRODUCTO: 10000,
      CANTIDAD_DISPONIBLE: 10
    },
    {
      CODIGO_PRODUCTO : "2",
      NOMBRE_PRODUCTO: "AGUA 15 LITROS",
      PRECIO_PRODUCTO: 5000,
      CANTIDAD_DISPONIBLE: 10
    },
    {
      CODIGO_PRODUCTO : "3",
      NOMBRE_PRODUCTO: "AGUA 2.5 LITROS",
      PRECIO_PRODUCTO: 1500,
      CANTIDAD_DISPONIBLE: 10
    },
    {
      CODIGO_PRODUCTO : "4",
      NOMBRE_PRODUCTO: "AGUA 2 LITROS",
      PRECIO_PRODUCTO: 1000,
      CANTIDAD_DISPONIBLE: 10
    },
    {
      CODIGO_PRODUCTO : "5",
      NOMBRE_PRODUCTO: "AGUA 1 LITROS",
      PRECIO_PRODUCTO: 800,
      CANTIDAD_DISPONIBLE: 10
    }
]

  constructor() { }

  getInventario() {
    return this.inventario;
  }
  removeInventario(id: number) {
    this.inventario.splice(id, 1);
  }


}
