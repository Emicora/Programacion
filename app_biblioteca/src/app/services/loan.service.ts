import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Loan {
  id_prestamo: number;
  fecha_prestamo: string;
  fecha_devolucion: string;
  id_usuario: number;
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
  addLoan(loan: Loan): Observable<Loan> {
    const headers = this.getAuthHeaders();
    return this.http.post<Loan>(`${this.apiUrl}/prestamos`, loan, { headers });
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
}
