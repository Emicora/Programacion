import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-nav', 
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
  }

  navigateHome(): void {
    if (this.userRole === 'admin') {
      this.router.navigate(['/homeadmin']);
    } else if (this.userRole === 'user') {
      this.router.navigate(['/home']);
    } else if (this.userRole === 'librarian') {
      this.router.navigate(['/homeadmin']);
    } else {
      console.error('No role found for the user');
      // Opcional: Redirigir a una página de acceso denegado o de inicio de sesión
      this.router.navigate(['/home']);
    }
  }

  isPending(): boolean {
    return this.userRole === 'pending';
  }

  isUser(): boolean {
    return this.userRole === 'user';
  }
  isAdmin(): boolean {
    return this.userRole === 'admin' || this.userRole === 'librarian';
  }

}
