import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';

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

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const loanId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLoanDetails(loanId);
  }

  loadLoanDetails(loanId: number): void {
    // Obtener los detalles del préstamo
    this.loanService.getLoanById(loanId).subscribe({
      next: (loan) => {
        this.loan = loan;
        // Cargar el libro relacionado con este préstamo usando `id_libro`
        if (loan.id_libro) {
          this.loadAssociatedBook(loan.id_libro);
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
}
