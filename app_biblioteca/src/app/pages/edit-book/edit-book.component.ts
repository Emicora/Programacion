import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editBookForm!: FormGroup;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del libro de la ruta
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario
    this.editBookForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      isbn: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      num_paginas: ['', [Validators.required, Validators.min(1)]],
      disponibles: ['', [Validators.required, Validators.min(0)]]
    });

    // Cargar datos del libro en el formulario
    if (this.bookId) {
      this.loadBookData();
    }
  }

  loadBookData(): void {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe({
        next: (book) => {
          this.editBookForm.patchValue(book);
        },
        error: (error) => {
          console.error('Error al cargar el libro:', error);
          alert('No se pudo cargar el libro. Redirigiendo a la lista de libros.');
          this.router.navigate(['/homeadmin']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editBookForm.valid && this.bookId) {
      this.bookService.updateBook(this.bookId, this.editBookForm.value).subscribe({
        next: () => {
          alert('Libro actualizado exitosamente.');
          this.router.navigate(['/homeadmin']);
        },
        error: (error) => {
          console.error('Error al actualizar el libro:', error);
          alert('Error al actualizar el libro. Intenta nuevamente.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
