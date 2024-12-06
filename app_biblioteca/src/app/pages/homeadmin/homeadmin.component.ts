
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

interface Book {
  id_libro: number;
  titulo: string;
  editorial: string;
  isbn: string;
  genero: string;
  disponibles: number;
  autor: string;
  num_paginas: number;
}

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.css'
})
export class HomeadminComponent implements OnInit {
  arrayLibros: Book[] = [];
  searchCriteria = {
    titulo: '',
    editorial: '',
    isbn: ''
  };
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 8;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  // Cargar libros con paginación y filtros
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

  // Ver detalles del libro
  viewBookDetails(bookId: number) {
    this.router.navigate(['/bookdetail', bookId]);
  }

  // Cambiar página
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks(this.currentPage);
    }
  }
}
