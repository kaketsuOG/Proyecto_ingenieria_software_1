import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { UsuarioService } from './usuario.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


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
export class UsuariosModule { }

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: any[] = ['rut', 'nombre', 'apellido1 usuario', 'apellido2 usuario','acciones usuario'];

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

