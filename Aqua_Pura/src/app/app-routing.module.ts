import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a la página de inicio de sesión
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent }, // Agrega una ruta para la barra de navegación
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a la página de inicio de sesión
  { path: 'login', component: LoginComponent },
  { path: 'informacion', component: InformacionComponent }, // Ruta para la página de información
  { path: 'navbar', component: NavbarComponent }, // Ruta para la barra de navegación
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a la página de inicio de sesión
  { path: 'login', component: LoginComponent },
  { path: 'informacion', component: InformacionComponent }, // Ruta para la página de información
  { path: 'productos', component: ProductosComponent }, // Ruta para la página de productos
  { path: 'navbar', component: NavbarComponent }, // Ruta para la barra de navegación
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a la página de inicio de sesión
  { path: 'login', component: LoginComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'registro', component: RegistroComponent }, // Ruta para la página de registro
  { path: 'navbar', component: NavbarComponent },
  // Otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
