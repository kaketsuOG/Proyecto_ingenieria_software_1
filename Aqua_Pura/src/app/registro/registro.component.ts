import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroExitoso: boolean = false; // Declaración de la propiedad

  constructor(private router: Router) {}

  onSubmit() {
    // Realiza la validación del formulario aquí
    const formularioValido = true; // Debes validar la información del formulario

    if (formularioValido) {
      this.registroExitoso = true; // Establece la propiedad en true para mostrar el mensaje
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    }
  }
}
