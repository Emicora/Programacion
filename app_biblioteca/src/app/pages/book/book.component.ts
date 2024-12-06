import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

interface Book {
  id_libro: number;
  titulo: string;
  editorial: string;
  fecha_publicacion: string;
  num_paginas: number;
  isbn: string;
  genero: string;
  disponibles: number;
  autor: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  arrayLibros: Book[] = [];
  currentPage: number = 1;   // Página actual
  totalPages: number = 1;    // Total de páginas
  perPage: number = 8;      // Libros por página

  searchCriteria: any = {    // Criterios de búsqueda
    titulo: '',
    editorial: '',
    isbn: ''
  };

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  // Cargar libros con o sin filtros de búsqueda
  loadBooks(page: number = 1) {
    if (this.searchCriteria.titulo || this.searchCriteria.editorial || this.searchCriteria.isbn) {
      // Si hay algún criterio de búsqueda, aplicamos el filtro
      this.bookService.searchBooks(this.searchCriteria, page, this.perPage).subscribe(response => {
        this.arrayLibros = response.libros;
        this.currentPage = response.page;
        this.totalPages = response.pages;
      });
    } else {
      // Si no hay criterios de búsqueda, cargamos todos los libros
      this.bookService.getBooks(page, this.perPage).subscribe(response => {
        this.arrayLibros = response.libros;
        this.currentPage = response.page;
        this.totalPages = response.pages;
      });
    }
  }

  // Búsqueda por criterios
  onSearchClick() {
    this.loadBooks(1);  // Volver a cargar los libros aplicando la búsqueda desde la primera página
  }

  // Cambiar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadBooks(this.currentPage + 1);
    }
  }

  // Cambiar a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.loadBooks(this.currentPage - 1);
    }
  }

  // Eliminar libro
  deleteBook(id_libro: number) {
    this.bookService.deleteBook(id_libro).subscribe(() => {
      // Actualizamos la lista de libros después de eliminar uno
      this.arrayLibros = this.arrayLibros.filter(book => book.id_libro !== id_libro);
    }, error => {
      console.error('Error eliminando el libro:', error); // Manejo de errores
    });
  }

  // Navegar a la página de agregar libro
  navigateToAddBook() {
    this.router.navigate(['/add-book']);
  }
}
