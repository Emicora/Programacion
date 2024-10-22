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
  userData: any;  // Aquí almacenaremos los datos del usuario que se va a editar

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario de la URL
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id !== null ? +id : null;

    // Inicializar el formulario
    this.editForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    // Cargar los datos del usuario en el formulario
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(data => {
        this.userData = data;
        this.editForm.patchValue({
          nombre: data.nombre,
          mail: data.mail,
          rol: data.rol
        });
      });
    }
  }

  // Enviar los datos actualizados al backend
  onSubmit() {
    if (this.editForm.valid) {
      this.userService.updateUser(this.userId!, this.editForm.value).subscribe(() => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/users']);  // Redirigir a la lista de usuarios después de actualizar
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
