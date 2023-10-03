import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contraseña: string = '';

  constructor(private http: HttpClient) { }

  iniciarSesion() {
    const url = 'http://localhost:3000/login'; // Cambia la URL según la configuración de tu servidor Node.js

    this.http.post(url, { usuario: this.usuario, contraseña: this.contraseña }).subscribe(
      (response: any) => {
        console.log(response);
        // Redirecciona o realiza acciones después del inicio de sesión exitoso
      },
      (error: any) => {
        console.error(error);
        // Muestra mensajes de error al usuario
      }
    );
  }
}