import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

interface Book {
  id_libro: number;
  titulo: string;
  editorial: string;
  isbn: string;
  genero: string;
  num_paginas: number;
  disponibles: number;
  autor: string;
}

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {
  book: Book | null = null;
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBookDetails(bookId);
    this.userRole = this.authService.getRole();
  }

  loadBookDetails(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(book => {
      this.book = book;
    });
  }

  isUser(): boolean {
    return this.userRole === 'user';
  }

  requestLoan(): void {
    if (this.book?.id_libro) {
      // Navegar a la página de préstamo con el ID del libro
      this.router.navigate(['/loandetail', this.book.id_libro]);
    } else {
      console.error('Error: No se encontró el ID del libro.');
    }
  }

  viewReviews(): void {
    if (this.book?.id_libro) {
      // Navegar a la página de reseñas con el ID del libro
      this.router.navigate(['/valoraciones', this.book.id_libro]);
    } else {
      console.error('Error: No se encontró el ID del libro.');
    }
  }
}
