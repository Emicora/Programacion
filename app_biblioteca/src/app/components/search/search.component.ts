import { Component, Input } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // Campos de búsqueda (pueden definirse dinámicamente)
  @Input() searchFields: { name: string, placeholder: string }[] = [];

  // Paginación
  perPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  // Lista de libros
  arrayLibros: any[] = [];

  // Criterios de búsqueda
  searchCriteria = {
    titulo: '',
    editorial: '',
    isbn: ''
  };

  // Inyectar el servicio de libros
  constructor(private bookService: BookService) {}

  // Cargar libros con filtros y paginación
  loadBooks(page: number = 1): void {
    const { titulo, editorial, isbn } = this.searchCriteria;

    this.bookService.getBookss(page, this.perPage, titulo, editorial, isbn).subscribe({
      next: (response) => {
        this.arrayLibros = response.libros.map((book: any) => ({
          id_libro: book.id_libro,
          titulo: book.titulo,
          editorial: book.editorial,
          isbn: book.isbn,
          genero: book.genero,
          num_paginas: book.num_paginas,
          disponibles: book.disponibles
        }));
        this.currentPage = response.page;
        this.totalPages = response.pages;
      },
      error: (error) => {
        console.error('Error al cargar libros:', error);
      }
    });
  }

  // Búsqueda
  onSearchClick(): void {
    this.loadBooks(1); // Reiniciar a la primera página al buscar
  }
}
