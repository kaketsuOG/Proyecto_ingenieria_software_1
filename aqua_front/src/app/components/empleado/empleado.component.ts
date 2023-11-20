import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
showEmpleadosInfo = false;
  showVehiculosInfo = false;
  showInventarioInfo = false;
  showHistorialInfo = false;

  toggleEmpleadosInfo() {
    this.showEmpleadosInfo = true;
    this.showVehiculosInfo = false;
    this.showInventarioInfo = false;
    this.showHistorialInfo = false;
  }

  toggleVehiculosInfo() {
    this.showEmpleadosInfo = false;
    this.showVehiculosInfo = true;
    this.showInventarioInfo = false;
    this.showHistorialInfo = false;
  }

  toggleInventarioInfo() {
    this.showEmpleadosInfo = false;
    this.showVehiculosInfo = false;
    this.showInventarioInfo = true;
    this.showHistorialInfo = false;
  }

  toggleHistorialInfo() {
    this.showEmpleadosInfo = false;
    this.showVehiculosInfo = false;
    this.showInventarioInfo = false;
    this.showHistorialInfo = true;
  }
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  
}}