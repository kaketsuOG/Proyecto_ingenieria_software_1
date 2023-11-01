import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
   }

   signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }

   login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
   }

   navigator(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }
   editarUsuario(usuario: any): Observable<any> {
    const editUrl = `${this.myAppUrl}/usuarios/${usuario.id}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.put(editUrl, usuario); // Realiza una solicitud PUT al servidor
  }
  eliminarUsuario(userId: number): Observable<any> {
    const deleteUrl = `${this.myAppUrl}/usuarios/${userId}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.delete(deleteUrl); // Realiza una solicitud DELETE al servidor
  }
  

}
export interface User {
  rut_usuario: string,
  contrasena: string,

}
