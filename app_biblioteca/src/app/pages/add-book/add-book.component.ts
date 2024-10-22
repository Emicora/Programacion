import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.addBookForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      isbn: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      num_paginas: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addBookForm.valid) {
      this.bookService.addBook(this.addBookForm.value).subscribe(() => {
        alert('Libro agregado con éxito');
        this.router.navigate(['/books']); // Navegar de regreso a la lista de libros
      }, error => {
        console.error('Error al agregar el libro:', error);
      });
    }
  }
}
