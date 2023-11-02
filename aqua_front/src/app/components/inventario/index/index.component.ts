import { Component,  NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { InventarioService } from '../inventario.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@NgModule({
  declarations: [
    // Declaraciones de componentes
  ],
  imports: [
    MatTableModule,MatButtonModule, MatDividerModule, MatIconModule,
    // Otros módulos de Angular Material que estés utilizando
  ],
  providers: [
    // Servicios y otros proveedores
  ]
})
export class InventarioIndexModule { }

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class InventarioIndexComponent implements OnInit {

  inventario: any[] = [];
  displayedColumns: any[] = ['rut', 'nombre', 'apellido1 usuario', 'apellido2 usuario','acciones usuario'];

  constructor(private inventarioService: InventarioService) {

    this.inventario = inventarioService.getInventario()
   }

  ngOnInit(): void {
  }

  eliminar_inventario(codigo_inventario: any) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      const index = this.inventario.map(object => object.CODIGO_PRODUCTO).indexOf(codigo_inventario);
      this,this.inventarioService.removeInventario(index)
    }
  }

}
