import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';
import { ValoracionService } from '../../services/valoracion.service';

interface Loan {
  id_prestamo?: number;
  id_usuario: number;
  fecha_prestamo: string;
  fecha_devolucion: string;
  id_libro: number;
}

interface Book {
  id_libro: number;
  titulo: string;
  editorial: string;
  fecha_publicacion: string;
  num_paginas: number;
  isbn: string;
  genero: string;
}

@Component({
  selector: 'app-loan-card',
  templateUrl: './loan-card.component.html',
  styleUrls: ['./loan-card.component.css']
})
export class LoanCardComponent implements OnInit {
  loan: Loan | null = null;
  associatedBook: Book | null = null;
  hasReviewed: boolean = false;
  userReviewId: number | null = null; // Almacena el ID de la reseña del usuario

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private bookService: BookService,
    private valoracionService: ValoracionService, // Servicio para gestionar valoraciones
    private router: Router
  ) {}

  ngOnInit(): void {
    const loanId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLoanDetails(loanId);
  }

  loadLoanDetails(loanId: number): void {
    this.loanService.getLoanById(loanId).subscribe({
      next: (loan) => {
        this.loan = loan;
        // Cargar el libro relacionado con este préstamo usando `id_libro`
        if (loan.id_libro) {
          this.loadAssociatedBook(loan.id_libro);
          this.checkIfReviewed(loan.id_libro, loan.id_usuario);
        }
      },
      error: (error) => console.error('Error al cargar el préstamo:', error)
    });
  }

  loadAssociatedBook(bookId: number): void {
    this.bookService.getBookById(bookId).subscribe({
      next: (book) => {
        this.associatedBook = book;
        console.log("Libro asociado cargado:", this.associatedBook);
      },
      error: (error) => console.error("Error al cargar el libro asociado:", error)
    });
  }

  checkIfReviewed(bookId: number, userId: number): void {
    this.valoracionService.getValoracionesByUser(userId).subscribe({
      next: (response) => {
        const valoraciones = response.filtros_aplicados || []; // Acceder a la clave correcta
        const userReview = valoraciones.find((valoracion: any) => valoracion.id_libro === bookId);
        if (userReview) {
          this.hasReviewed = true;
          this.userReviewId = userReview.id_valoracion; // Guardar el ID de la reseña del usuario
        } else {
          this.hasReviewed = false;
          this.userReviewId = null;
        }
        console.log(`¿El usuario ya hizo una reseña? ${this.hasReviewed}`);
      },
      error: (error) => console.error("Error al verificar reseñas:", error)
    });
  }

  deleteReview(): void {
    if (this.userReviewId) {
      this.valoracionService.deleteValoracion(this.userReviewId).subscribe({
        next: () => {
          alert('Reseña eliminada con éxito.');
          this.hasReviewed = false;
          this.userReviewId = null;
        },
        error: (error) => console.error('Error al eliminar la reseña:', error)
      });
    } else {
      alert('No se encontró una reseña para eliminar.');
    }
  }

  goToAddValoracion(bookId: number): void {
    this.router.navigate(['/add-valoracion', bookId]);
  }
}
