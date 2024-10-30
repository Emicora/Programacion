import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId: number | null = null;
  editForm!: FormGroup;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? parseInt(id, 10) : null;
      console.log("ID del usuario a editar:", this.userId); // Confirmamos el ID capturado

      if (this.userId === null) {
        alert('ID de usuario no válido');
        return;
      }

      // Inicializar el formulario
      this.editForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        rol: ['', Validators.required]
      });

      // Cargar los datos del usuario en el formulario
      this.loadUserData();
    });
  }

  loadUserData(): void {
    console.log("Cargando datos del usuario con ID:", this.userId);
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: data => {
          this.userData = data;
          console.log("Datos del usuario cargados:", data);
          this.editForm.patchValue({
            nombre: data.nombre,
            mail: data.mail,
            rol: data.rol
          });
        },
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
          alert('No se pudo cargar la información del usuario.');
        }
      });
    }
  }

  onSubmit(): void {
    console.log("Intento de enviar el formulario de edición.");
    console.log('Formulario:', this.editForm.value);
    console.log('Formulario válido:', this.editForm.valid);

    if (this.editForm.valid && this.userId !== null) {
      this.userService.updateUser(this.userId, this.editForm.value).subscribe({
        next: () => {
          alert('Usuario actualizado exitosamente');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('No se pudo actualizar el usuario. Por favor, intenta nuevamente.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
