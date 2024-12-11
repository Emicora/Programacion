import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

interface BookResponse {
  libros: Book[];
  page: number;
  pages: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = '/api';  // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener el token de autenticación
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Configurar los headers con el token para las solicitudes autenticadas
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener todos los libros con paginación
  getBooks(page: number = 1, perPage: number = 10): Observable<BookResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<BookResponse>(`${this.apiUrl}/libros?page=${page}&per_page=${perPage}`, { headers });
  }

  getBookss(page: number, perPage: number, titulo?: string, editorial?: string, isbn?: string): Observable<any> {
    const params: any = { page, per_page: perPage };
    if (titulo) params.titulo = titulo;
    if (editorial) params.editorial = editorial;
    if (isbn) params.isbn = isbn;
  
    return this.http.get<any>(`${this.apiUrl}/libros?sortby_promedio=desc`, { params });
  }
  

  // Buscar libros por criterios de búsqueda
  searchBooks(searchCriteria: any, page: number = 1, perPage: number = 10): Observable<BookResponse> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    // Añadir criterios de búsqueda dinámicamente si están presentes
    if (searchCriteria.titulo) {
      params = params.set('titulo', searchCriteria.titulo);
    }
    if (searchCriteria.editorial) {
      params = params.set('editorial', searchCriteria.editorial);
    }
    if (searchCriteria.isbn) {
      params = params.set('isbn', searchCriteria.isbn);
    }

    return this.http.get<BookResponse>(`${this.apiUrl}/libros`, { headers, params });
  }

  // Agregar un nuevo libro
  addBook(book: Book): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.post<Book>(`${this.apiUrl}/libros`, book, { headers });
  }

  // Obtener un libro por ID
  getBookById(id_libro: number): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book>(`${this.apiUrl}/libro/${id_libro}`, { headers });
  }

  // Actualizar un libro existente
  updateBook(id_libro: number, book: Book): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.put<Book>(`${this.apiUrl}/libro/${id_libro}`, book, { headers });
  }

  // Eliminar un libro
  deleteBook(id_libro: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/libro/${id_libro}`, { headers });
  }
  
  updateBookAvailability(bookId: number, updatedBook: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/libro/${bookId}`, updatedBook);
  }
  
  
}
