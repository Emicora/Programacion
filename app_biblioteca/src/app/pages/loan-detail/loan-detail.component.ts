import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';

interface Book {
  id_libro: number;
  titulo: string;
  fecha_publicacion: string;
  num_paginas: number;
  genero: string;
  disponibles: number; // Asegúrate de que este campo exista en el modelo del backend
}

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  book: Book | null = null; // Detalle del libro seleccionado
  startDate: string = ''; // Fecha de inicio del préstamo
  endDate: string = ''; // Fecha de fin del préstamo

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookDetails();
  }

  /**
   * Cargar los detalles del libro basado en el ID pasado por la ruta.
   */
  loadBookDetails(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID del libro de la URL
    if (bookId) {
      console.log(`Cargando detalles para el libro con ID: ${bookId}`);
      this.bookService.getBookById(bookId).subscribe({
        next: (book) => {
          this.book = book;
          console.log('Libro cargado:', this.book);
        },
        error: (error) => {
          console.error('Error al cargar el libro:', error);
          alert('No se pudo cargar el libro. Por favor, inténtalo de nuevo.');
          this.router.navigate(['/home']); // Redirigir al home en caso de error
        }
      });
    } else {
      alert('Error: No se recibió un ID de libro válido.');
      this.router.navigate(['/home']);
    }
  }

  /**
   * Crear un nuevo préstamo basado en los datos ingresados.
   */
  requestLoan(): void {
    if (!this.startDate || !this.endDate) {
      alert('Por favor, selecciona las fechas de inicio y fin.');
      return;
    }

    if (!this.book) {
      alert('Error: No se encontró el libro asociado.');
      return;
    }

    // Crear el objeto del préstamo incluyendo `id_libro` del libro actual
    const newLoan = {
      fecha_prestamo: this.startDate,
      fecha_devolucion: this.endDate,
      id_usuario: Number(localStorage.getItem('id')), // ID del usuario autenticado
      id_libro: this.book.id_libro // ID del libro relacionado
    };

    console.log('Creando préstamo:', newLoan);

    // Crear el préstamo
    this.loanService.addLoan(newLoan).subscribe({
      next: () => {
        // Actualizar la cantidad de libros disponibles
        if (this.book) {
          const updatedBook = { ...this.book, disponibles: this.book.disponibles - 1 };

          this.bookService.updateBookAvailability(this.book.id_libro, updatedBook).subscribe({
            next: () => {
              console.log('Disponibilidad del libro actualizada:', updatedBook);
              alert('Préstamo creado con éxito.');
              this.router.navigate(['/home']); // Redirigir al home después de crear el préstamo
            },
            error: (error) => {
              console.error('Error al actualizar la disponibilidad del libro:', error);
              alert('Error al actualizar la disponibilidad del libro.');
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al crear el préstamo:', error);
        alert('Error al crear el préstamo. Por favor, inténtalo de nuevo.');
      }
    });
  }
}
