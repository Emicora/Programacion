import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  private apiUrl = '/api'; // URL base para las valoraciones

  constructor(private http: HttpClient) {}


  addValoracion(valoracion: { id_libro: number; id_usuario: number; valoracion: number; comentario: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/valoraciones`, valoracion);
  }

  getValoracionesByUser(id_usuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/valoraciones?id_usuario=${id_usuario}`);
  }

  getValoracionesByBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/valoraciones?id_libro=${bookId}`);
  }

  getValoracionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/valoracion${id}`);
  }

  updateValoracion(id: number, valoracion: { valoracion?: number; comentario?: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/valoracion${id}`, valoracion);
  }


  deleteValoracion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/valoracion/${id}`);
  }
}
