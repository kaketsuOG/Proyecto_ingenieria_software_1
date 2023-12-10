import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {

  // Propiedades para almacenar los resultados y posibles errores
  resultadoMejorDia: any;
  errorObtenerMejorDia: any;

  // Propiedad para almacenar la fecha seleccionada
  fechaInicio: string = '2023-01-01';
  fechaFinal: string = '2023-12-31';

  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    // Puedes realizar alguna lógica de inicialización si es necesario
  }

  // Método para obtener el mejor día del mes
  obtenerMejorDia() {

    // Llama al servicio para obtener el mejor día
    this.historialService.getVentaDia(this.fechaInicio, this.fechaFinal).subscribe(
      (data) => {
        // Almacena el resultado
        this.resultadoMejorDia = data;
      },
      (error) => {
        // Almacena el posible error
        this.errorObtenerMejorDia = error;
      }
    );
  }
}
