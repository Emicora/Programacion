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
      email: ['', [Validators.required, Validators.email]], // Añadido validación de email
      password: ['', Validators.required]
    });
  }

  irAlLogin(dataLogin: any) {
    this.authService.login(dataLogin.email, dataLogin.password).subscribe({
      next: (rta: any) => {
        alert('Credenciales correctas!!!');
        console.log('Éxito: ', rta);
        localStorage.setItem('token', rta.access_token);
        this.router.navigateByUrl('home');
      },
      error: (err: any) => {
        alert('Usuario o contraseña incorrecta.');
        console.log('Error: ', err);
        localStorage.removeItem('token');
      },
      complete: () => {
        console.log('Finalizó');
      }
    });
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
