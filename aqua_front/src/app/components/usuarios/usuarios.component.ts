import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { UsuarioService } from './usuario.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@NgModule({
  declarations: [
    // Declaraciones de componentes
  ],
  imports: [
    MatTableModule,
    // Otros módulos de Angular Material que estés utilizando
  ],
  providers: [
    // Servicios y otros proveedores
  ]
})
export class UsuariosModule { }

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: string[] = ['rut', 'nombre', 'apellido1 usuario', 'apellido2 usuario'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    // Cuando se inicia el componente, obtén los usuarios del servicio
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      console.log(data)
      this.usuarios = data;
    });
  }

  // Método para editar un usuario
  editarUsuario(usuario: any) {
    // Aquí puedes implementar la lógica para editar un usuario
    console.log('Editar usuario:', usuario);
  }

  // Método para eliminar un usuario
  eliminarUsuario(usuario: any) {
    // Aquí puedes implementar la lógica para eliminar un usuario
    console.log('Eliminar usuario:', usuario);
  }
}

