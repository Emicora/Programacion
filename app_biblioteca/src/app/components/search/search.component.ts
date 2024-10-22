import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // Definir los campos de búsqueda dinámicamente según el contexto
  @Input() searchFields: { name: string, placeholder: string }[] = [];

  // Objeto para almacenar los criterios de búsqueda
  searchCriteria: any = {};

  // Función que se ejecuta cuando el botón de búsqueda es presionado
  onSearchClick() {
    console.log(this.searchCriteria);
    // Aquí llamas a un servicio para enviar los criterios de búsqueda al backend
  }
}
