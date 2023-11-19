import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    
  }
  redirectToCliente() {
    // Redirige a la página de registro (reemplaza 'nombre-de-ruta' con la ruta real)
    this.router.navigate(['/cliente']);
  }
}
