import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

interface User {
  id_usuario: number;
  nombre: string;
  mail: string;
  rol: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  arrayUsuarios: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 7;

  // Criterios de búsqueda
  searchCriteria = {
    nombre: '',
    email: '',
    rol: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar usuarios con paginación y filtros
  loadUsers(page: number = 1) {
    const { nombre, email, rol } = this.searchCriteria;

    // Llamada al servicio con los filtros
    this.userService.getUsers(page, this.perPage, nombre, email, rol).subscribe(
      response => {
        this.arrayUsuarios = response.usuarios.map((user: any) => ({
          id_usuario: user.id_usuario,
          nombre: user.nombre,
          mail: user.mail,
          rol: user.rol
        }));
        this.currentPage = response.page;
        this.totalPages = response.pages;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  // Ejecutar búsqueda cuando se hace clic en "Buscar"
  onSearchClick() {
    // Reiniciar la página a la primera cuando se realiza una búsqueda
    this.loadUsers(1);
  }

  // Cambiar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadUsers(this.currentPage + 1);
    }
  }

  // Cambiar a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.loadUsers(this.currentPage - 1);
    }
  }

  // Eliminar usuario
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        // Actualizar la lista de usuarios después de eliminar uno
        this.arrayUsuarios = this.arrayUsuarios.filter(user => user.id_usuario !== id);
        alert('Usuario eliminado exitosamente.');
        // Cargar de nuevo los usuarios en caso de que la página esté vacía
        if (this.arrayUsuarios.length === 0 && this.currentPage > 1) {
          this.previousPage();
        }
      },
      error => {
        console.error('Error eliminando el usuario:', error);
      }
    );
  }

  goToEditProfile(user: User) {
    if (user.id_usuario) {
      this.router.navigate(['/edit-profile', user.id_usuario]);
    } else {
      console.error("ID de usuario no válido:", user);
    }
  }

  // Redirigir al formulario de creación de usuario
  goToCreateUser() {
    this.router.navigate(['/create-user']);
  }
}
