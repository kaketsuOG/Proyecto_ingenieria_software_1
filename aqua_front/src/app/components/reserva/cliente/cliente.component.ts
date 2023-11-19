import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  celular: string = '';
  name: string = '';
  apellido1: string = '';
  apellido2: string = '';
  direccion: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  addCliente() {

    // Validamos que el usuario ingrese valores
    if (this.celular == '' || this.name == ''  || this.apellido1 == '' || this.apellido2 == '' || this.direccion == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    

    // Creamos el objeto
    const cliente: Cliente = {
      celular_cliente: this.celular,
      nombre_cliente: this.name,
      apellido1_cliente: this.apellido1,
      apellido2_cliente: this.apellido2,
      direccion_cliente: this.direccion
    }

    
  }
}
export interface Cliente {
  celular_cliente: string,
  nombre_cliente: string,
  apellido1_cliente: string,
  apellido2_cliente: string,
  direccion_cliente: string
}
