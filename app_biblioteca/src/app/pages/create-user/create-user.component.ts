import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createForm: FormGroup;
  showSuccessMessage: boolean = false;
  isLibrarian: boolean = false; // Si el usuario actual es un bibliotecario


  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private authService: AuthService

  ) {
    this.createForm = this.fb.group({
      nombre: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      rol: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLibrarian = this.authService.getRole() === 'librarian';

  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.userService.addUser(this.createForm.value).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate(['/users']); // Redirigir a la lista de usuarios después de un breve tiempo
          }, 1000); // Esperar 2 segundos antes de redirigir
        },
        (error) => {
          console.error('Error creando el usuario:', error);
        }
      );
    }
  }
}
