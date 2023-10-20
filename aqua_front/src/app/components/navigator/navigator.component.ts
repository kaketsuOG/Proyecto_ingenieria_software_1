import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
showEmpleadosInfo = false;
  showVehiculosInfo = false;
  showInventarioInfo = false;

  toggleEmpleadosInfo() {
    this.showEmpleadosInfo = true;
    this.showVehiculosInfo = false;
    this.showInventarioInfo = false;
  }

  toggleVehiculosInfo() {
    this.showEmpleadosInfo = false;
    this.showVehiculosInfo = true;
    this.showInventarioInfo = false;
  }

  toggleInventarioInfo() {
    this.showEmpleadosInfo = false;
    this.showVehiculosInfo = false;
    this.showInventarioInfo = true;
  }
  constructor(private breakpointObserver: BreakpointObserver) {}

  
}
