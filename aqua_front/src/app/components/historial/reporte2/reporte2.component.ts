import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  resultadoVentasPorMes: any;
  errorObtenerVentasPorMes: any;
  mensajeSinDatos: string = '';
  fechaInicio: string = '';

  // Variable booleana para mostrar/ocultar la tabla
  mostrarDatos: boolean = false;

  constructor(private historialService: HistorialService) {}

  ngOnInit() {}

  obtenerVentasPorMes() {
    this.historialService.getVentasPorMes(this.fechaInicio).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);

        // Verificar si hay datos disponibles
        if (data) {
          this.resultadoVentasPorMes = data;
          this.mensajeSinDatos = ''; // Limpiar el mensaje informativo si hay datos
          this.mostrarDatos = true; // Mostrar la tabla si hay datos
        } else {
          this.resultadoVentasPorMes = null;
          this.mensajeSinDatos = 'No hay datos disponibles para el periodo especificado.';
          this.mostrarDatos = false; // Ocultar la tabla si no hay datos
        }
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);

        // Extraer el mensaje específico del error
        const mensajeError =
          error?.error?.msg ||
          'Error al obtener el reporte. Por favor, intenta de nuevo más tarde.';

        // Limpiar el resultado en caso de error
        this.resultadoVentasPorMes = null;
        this.mensajeSinDatos = mensajeError;
        this.mostrarDatos = false; // Ocultar la tabla en caso de error
      }
    );
  }
}