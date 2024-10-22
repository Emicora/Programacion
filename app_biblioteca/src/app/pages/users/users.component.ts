import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';  // Importar el Router

interface User {
  id: number;
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
  currentPage: number = 1;  // Página actual
  totalPages: number = 1;   // Total de páginas
  perPage: number = 7;     // Usuarios por página

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

    // Llamamos al servicio con los filtros (si están vacíos, el servicio debería ignorarlos)
    this.userService.getUsers(page, this.perPage, nombre, email, rol).subscribe(response => {
      this.arrayUsuarios = response.usuarios;
      this.currentPage = response.page;
      this.totalPages = response.pages;
    });
  }

  // Buscar usuarios al hacer click en el botón "Buscar"
  onSearchClick() {
    // Reinicia a la primera página cuando se realiza una búsqueda
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
    this.userService.deleteUser(id).subscribe(() => {
      // Actualizamos la lista de usuarios después de eliminar uno
      this.arrayUsuarios = this.arrayUsuarios.filter(user => user.id !== id);
    }, error => {
      console.error('Error eliminando el usuario:', error); // Manejo de errores
    });
  }

  // Redirigir al formulario de creación de usuario
  goToCreateUser() {
    this.router.navigate(['/create-user']);  // Redirigir a la página de creación de usuario
  }
}
