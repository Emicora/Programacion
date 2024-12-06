import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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



interface Loan {
  fecha_prestamo: string;
  fecha_devolucion: string;
  id_usuario: number;
  id_prestamo: number;
  id_libro: number;
}

interface LoanResponse {
  prestamos: Loan[];
  page: number;
  pages: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = '/api';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener el token de autenticación desde localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener préstamos del usuario con paginación
  getUserLoans(id_usuario: number, page: number, perPage: number): Observable<LoanResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<LoanResponse>(`${this.apiUrl}/prestamos?id_usuario=${id_usuario}&page=${page}&per_page=${perPage}`, { headers });
  }

  // Agregar un préstamo
  addLoan(loan: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/prestamos`, loan, { headers });
  }

  // Modificar un préstamo existente
  updateLoan(loanId: number, loan: Partial<Loan>): Observable<Loan> {
    const headers = this.getAuthHeaders();
    return this.http.put<Loan>(`${this.apiUrl}/prestamo/${loanId}`, loan, { headers });
  }

  // Eliminar un préstamo
  cancelLoan(loanId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/prestamo/${loanId}`, { headers });
  }

  // Obtener detalles de un préstamo específico
  getLoanById(id_prestamo: number): Observable<Loan> {
    const headers = this.getAuthHeaders();
    return this.http.get<Loan>(`${this.apiUrl}/prestamo/${id_prestamo}`, { headers });
  }

  getBookById(bookId: number): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book>(`${this.apiUrl}/libro/${bookId}`, { headers });
  }

  updateBookAvailability(bookId: number, updatedBook: Partial<Book>): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.put<Book>(`${this.apiUrl}/libro/${bookId}`, updatedBook, { headers });
  }
  
  

  getLoans(
    page: number = 1,
    per_page: number = 10,
    fecha_prestamo: string = '',
    fecha_devolucion: string = '',
    id_usuario: string = '',
    id_libro: string = ''
  ): Observable<LoanResponse> {
    const headers = this.getAuthHeaders();
  
    // Crear parámetros opcionales si existen
    let params = `page=${page}&per_page=${per_page}`;
    if (fecha_prestamo) params += `&fecha_prestamo=${fecha_prestamo}`;
    if (fecha_devolucion) params += `&fecha_devolucion=${fecha_devolucion}`;
    if (id_usuario) params += `&id_usuario=${id_usuario}`;
    if (id_libro) params += `&id_libro=${id_libro}`;
  
    return this.http.get<LoanResponse>(`${this.apiUrl}/prestamos?${params}`, { headers });
  }
  
}
