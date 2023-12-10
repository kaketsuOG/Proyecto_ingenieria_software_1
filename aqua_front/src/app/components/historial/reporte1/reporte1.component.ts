import { Component, OnInit } from '@angular/core';

import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {

  resultadoMasVendido: any; // Debes declarar la propiedad resultadoMasVendido
  errorObtenerMasVendido: any; // Debes declarar la propiedad errorObtenerMasVendido

  
  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    this.obtenerMasVendido();
  }

  obtenerMasVendido() {
    const fechaInicio = '2023-01-01'; // Ajusta según tus necesidades
    const fechaFinal = '2023-12-31'; // Ajusta según tus necesidades

    this.historialService.getMasVendido(fechaInicio, fechaFinal).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);
        // Procesa la respuesta del servidor según tus necesidades
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);
        // Maneja el error según tus necesidades
      }
    );
  }
}