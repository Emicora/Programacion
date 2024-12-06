import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  mail: string = '';
  contrasena: string = '';

  private apiUrl = '/api'; // Cambiar según la URL de tu backend

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(event: Event): void {
    event.preventDefault();

    const newUser = {
      contrasena: this.contrasena,
      mail: this.mail,
      nombre: this.nombre,
      rol: 'pending'
    };

    this.http.post(`${this.apiUrl}/auth/register`, newUser).subscribe({
      next: () => {
        alert('Usuario registrado exitosamente.');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al registrar el nombre:', error);
        alert('Ocurrió un error al registrar el nombre.');
      }
    });
  }
}
