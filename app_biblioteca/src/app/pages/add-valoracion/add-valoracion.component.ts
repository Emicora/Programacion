import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValoracionService } from '../../services/valoracion.service';

@Component({
  selector: 'app-add-valoracion',
  templateUrl: './add-valoracion.component.html',
  styleUrls: ['./add-valoracion.component.css']
})
export class AddValoracionComponent implements OnInit {
  addValoracionForm: FormGroup;
  ratingOptions: number[] = [1, 2, 3, 4, 5];
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private valoracionService: ValoracionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addValoracionForm = this.fb.group({
      valoracion: [null, Validators.required],
      comentario: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del libro desde la URL
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.bookId) {
      alert('Error: No se proporcionó un ID de libro válido.');
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.addValoracionForm.valid && this.bookId) {
      const valoracionData = {
        id_libro: this.bookId,
        id_usuario: Number(localStorage.getItem('id')), // ID del usuario autenticado
        ...this.addValoracionForm.value
      };

      this.valoracionService.addValoracion(valoracionData).subscribe({
        next: () => {
          alert('Valoración enviada con éxito.');
          this.router.navigate(['/bookdetail', this.bookId]);
        },
        error: (error) => {
          console.error('Error al enviar la valoración:', error);
          alert('No se pudo enviar la valoración. Intenta nuevamente.');
        }
      });
    }
  }
}
