import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  mostrarLogin: boolean = false; // Agrega esta propiedad

  toggleLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }

  login() {
    // Implementa la lógica de autenticación aquí
  }
}



