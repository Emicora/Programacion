import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;
  
  userId: number | null = null; // ID del usuario autenticado

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Obtener ID del usuario autenticado

    if (!this.userId) {
      alert("No se pudo cargar la información del usuario.");
      return;
    }

    // Inicializar el formulario
    this.profileForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    // Cargar datos del usuario
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId!).subscribe({
      next: (data) => {
        this.userData = data;
        this.profileForm.patchValue({
          nombre: data.nombre,
          mail: data.mail,
          rol: data.rol
        });
      },
      error: (err) => {
        console.error("Error al cargar datos del usuario:", err);
        alert("No se pudieron cargar los datos del usuario.");
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.userId) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
        next: () => {
          alert("Perfil actualizado exitosamente.");
        },
        error: (err) => {
          console.error("Error al actualizar el perfil:", err);
          alert("Hubo un error al actualizar el perfil.");
        }
      });
    }
  }
}
