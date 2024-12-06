import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('rol'); // Asumiendo que el rol se guarda en el localStorage
  const requiredRoles: string[] = route.data?.['roles'] || []; // Roles requeridos desde la configuración de la ruta

  if (!token) {
    router.navigateByUrl('/homesinreg');
    return false;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole || '')) {
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
