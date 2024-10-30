import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';

interface Loan {
  id_prestamo: number;
  fecha_prestamo: string;
  fecha_devolucion: string;
}

interface Book {
  id_libro: number;
  titulo: string;
  editorial: string;
  fecha_publicacion: string;
  num_paginas: number;
  isbn: string;
  genero: string;
  id_prestamo?: number;
}

@Component({
  selector: 'app-loan-card',
  templateUrl: './loan-card.component.html',
  styleUrls: ['./loan-card.component.css']
})
export class LoanCardComponent implements OnInit {
  loan: Loan | null = null;
  

  associatedBook: Book[] = [];

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
        // Cargar el libro relacionado con este préstamo
        this.loadAssociatedBook(loanId);
      },
      error: (error) => console.error('Error al cargar el préstamo:', error)
    });
  }

  loadAssociatedBook(loanId: number): void {
    this.bookService.getBooksByLoanId(loanId).subscribe({
      next: (response) => {
        this.associatedBook = response.libros;
        console.log("Libros asociados cargados:", this.associatedBook);
      },
      error: (error) => console.error("Error al cargar el libro asociado:", error)
    });
  }
  
  
  
  
  
}
