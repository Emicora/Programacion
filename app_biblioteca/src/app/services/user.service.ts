import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  country: string;
  id: number;
  nombre: string;
  mail: string;
  rol: string;
}

interface UserResponse {
  usuarios: User[];
  page: number;
  pages: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api';

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

  // Obtener usuarios con filtros y paginación
  getUsers(page: number = 1, per_page: number = 10, nombre: string = '', email: string = '', rol: string = ''): Observable<UserResponse> {
    const headers = this.getAuthHeaders();

    // Crear parámetros opcionales si existen
    let params = `page=${page}&per_page=${per_page}`;
    if (nombre) params += `&nombre=${nombre}`;
    if (email) params += `&email=${email}`;
    if (rol) params += `&rol=${rol}`;

    return this.http.get<UserResponse>(`${this.apiUrl}/usuarios?${params}`, { headers });
  }

  // Agregar un nuevo usuario
  addUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(`${this.apiUrl}/usuarios`, user, { headers });
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/usuario/${id}`, { headers });
  }

  // Actualizar un usuario existente
  updateUser(id: number, user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/usuario/${id}`, user, { headers });
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/usuario/${id}`, { headers });
  }
}
