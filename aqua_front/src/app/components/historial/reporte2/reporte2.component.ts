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
  mensajeSinDatos: string = ''; // Mensaje informativo cuando no hay datos

  fechaInicio: string = '2023-01-01';
  fechaFinal: string = '2023-12-31';

  // Nueva propiedad para controlar la visibilidad de los datos
  mostrarDatos: boolean = false;

  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    // Eliminamos la llamada a obtenerVentasPorMes en ngOnInit, 
    // ya que ahora se llamará únicamente cuando se haga clic en el botón.
  }

  obtenerVentasPorMes() {
    this.historialService.getVentaPorMes(this.fechaInicio, this.fechaFinal).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);

        // Verificar si hay datos disponibles
        if (data) {
          this.resultadoVentasPorMes = data;
          this.mensajeSinDatos = ''; // Limpiar el mensaje informativo si hay datos
          
          // Mostrar los datos cuando se obtienen resultados
          this.mostrarDatos = true;
        } else {
          this.resultadoVentasPorMes = null;
          this.mensajeSinDatos = 'No hay datos disponibles para el periodo especificado.';
          
          // Ocultar los datos cuando no hay resultados
          this.mostrarDatos = false;
        }
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);

        // Extraer el mensaje específico del error
        const mensajeError = error?.error?.msg || 'Error al obtener el reporte. Por favor, intenta de nuevo más tarde.';

        // Limpiar el resultado en caso de error
        this.resultadoVentasPorMes = null;
        this.mensajeSinDatos = mensajeError;

        // Ocultar los datos en caso de error
        this.mostrarDatos = false;
      }
    );
  }
}