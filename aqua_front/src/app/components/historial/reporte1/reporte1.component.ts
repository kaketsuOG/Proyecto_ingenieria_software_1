import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
})
export class ReporteComponent {
  fechaInicio: NgbDateStruct;
  fechaFinal: NgbDateStruct;
  reporte: any;  // Esta variable almacenará el resultado del reporte

  constructor(private calendar: NgbCalendar, private reservaService: HistorialService) {}

  abrirCalendario() {
    this.calendar.navigateTo();
  }

  // Método para ejecutar el reporte
  ejecutarReporte() {
    // Formatea las fechas seleccionadas para enviarlas al servicio
    const fechaInicioStr = this.formatoFecha(this.fechaInicio);
    const fechaFinalStr = this.formatoFecha(this.fechaFinal);

    // Llama al servicio para obtener el reporte
    this.reservaService.obtenerReporteMasVendido(fechaInicioStr, fechaFinalStr)
      .subscribe(
        (data) => {
          // Almacena el resultado del reporte
          this.reporte = data;
        },
        (error) => {
          console.error('Error al obtener el reporte:', error);
        }
      );
  }

  // Método para formatear la fecha al formato requerido
  formatoFecha(fecha: NgbDateStruct): string {
    if (fecha) {
      return `${fecha.year}-${fecha.month}-${fecha.day}`;
    }
    return null;
  }
}