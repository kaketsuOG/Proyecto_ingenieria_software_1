import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

// Guards
//import { AuthGuard } from './utils/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosEditComponent } from './components/usuarios/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navigator', component: NavigatorComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/edit/:id', component: UsuariosEditComponent },




 //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
