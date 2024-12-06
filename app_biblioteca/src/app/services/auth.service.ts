import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number; // Asegúrate de que este tipo coincida con el tipo real de tu ID
  rol: string;
  // Otros campos que tengas en el token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(mail: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { mail, contrasena }).pipe(
      tap(response => {
        // Almacenar el token, el ID y el rol en localStorage
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('id', response.id); // Almacena el ID del usuario
        if (response.rol) {
          localStorage.setItem('rol', response.rol); // Almacena el rol del usuario
        } else {
          console.error('El rol no está disponible en la respuesta del servidor');
        }
      })
    );
  }
  

  // Obtener el token de autenticación desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el ID del usuario desde localStorage
  getUserId(): number | null {
    const id = localStorage.getItem('id');
    return id ? +id : null; // Convertir el ID a número
  }

  // Decodificar el token JWT para extraer el payload
  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();  // Obtener el token del localStorage
    if (token) {
      try {
        return jwtDecode<DecodedToken>(token);  // Decodificar el token JWT
      } catch (error) {
        console.error('Error decoding token:', error);  // Capturar cualquier error durante la decodificación
        return null;
      }
    }
    return null; // Si no hay token, retornar null
  }

  // Obtener el rol del usuario a partir del token JWT
  getRole(): string | null {
    const decodedToken = this.getDecodedToken(); // Decodificar el token
    return decodedToken && decodedToken.rol ? decodedToken.rol : null;  // Asegurarse de que 'rol' esté presente
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Verificar si el usuario tiene el rol de administrador
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // Verificar si el usuario tiene el rol de bibliotecario
  isLibrarian(): boolean {
    return this.getRole() === 'librarian';
  }

  // Verificar si el usuario tiene el rol de usuario
  isUser(): boolean {
    return this.getRole() === 'user';
  }

  // Cerrar sesión y eliminar token y ID de localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id'); // También eliminar el ID
  }
}
