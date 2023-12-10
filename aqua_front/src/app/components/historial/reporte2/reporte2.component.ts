import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  resultadoMesMasVendido: any;
  errorObtenerMesMasVendido: any;
  mensajeSinDatos: string = ''; // Mensaje informativo cuando no hay datos

  fechaInicio: string = '2023-01-01';
  fechaFinal: string = '2023-12-31';

  // Variable booleana para mostrar/ocultar la tabla
  mostrarTabla: boolean = false;
  // Nueva propiedad para almacenar los datos de la tabla
  datosTablaMasVendido: any[] = [];

  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    this.obtenerMesMasVendido();
  }

  obtenerMesMasVendido() {
    this.historialService.getVentaMes(this.fechaInicio, this.fechaFinal).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);

        // Verificar si hay datos disponibles
        if (data) {
          this.resultadoMesMasVendido = data;
          this.mensajeSinDatos = ''; // Limpiar el mensaje informativo si hay datos
        } else {
          this.resultadoMesMasVendido = null;
          this.mensajeSinDatos = 'No hay datos disponibles para el mes que más se vendió.';
        }
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);

        // Extraer el mensaje específico del error
        const mensajeError = error?.error?.msg || 'Error al obtener el reporte. Por favor, intenta de nuevo más tarde.';
        
        // Limpiar el resultado en caso de error
        this.resultadoMesMasVendido = null;
        this.mensajeSinDatos = mensajeError;
      }
    );
  }
}