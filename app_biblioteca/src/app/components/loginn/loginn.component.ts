import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class LoginnComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]], // Añadido validación de email
      contrasena: ['', Validators.required]
    });
  }

irAlLogin(dataLogin: any) {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;

    this.authService.login(formData.mail, formData.contrasena).subscribe({
      next: (response) => {
        alert('Credenciales correctas!');

        // Obtener el rol desde el AuthService
        const role = this.authService.getRole();

        // Redirigir según el rol
        this.redirectUserByRole(role);
      },
      error: (err) => {
        alert('Usuario o contraseña incorrecta.');
        console.log('Error: ', err);
      }
    });
  }

}
redirectUserByRole(role: string | null) {
  switch (role) {
    case 'admin':
      this.router.navigate(['/homeadmin']);  // Redirigir a la página de admin
      break;
    case 'user':
      this.router.navigate(['/home']);  // Redirigir a la página de usuario
      break;
    case 'librarian':
      this.router.navigate(['/homeadmin']);  // Redirigir a la página de bibliotecario
      break;
    default:
      this.router.navigate(['/home']);  // Redirigir a la página de inicio o a una página predeterminada
      break;
  }
}



  submit() {
    if (this.loginForm.valid) {
      console.log('Datos del formulario: ', this.loginForm.value);
      this.irAlLogin(this.loginForm.value);
    } else {
      alert('Los valores son requeridos');
    }
  }
}
