import { Component } from '@angular/core';
import { Location } from '@angular/common'; // Importa Location desde @angular/common

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent {

  constructor(private location: Location) { }

  // Método que vuelve a la página anterior
  goBack(): void {
    this.location.back(); // Este método regresa a la página anterior
  }
}
