import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirigir a la página de inicio de sesión
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
