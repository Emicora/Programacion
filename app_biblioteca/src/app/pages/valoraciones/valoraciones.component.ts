import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValoracionService } from '../../services/valoracion.service';

interface Valoracion {
  id_usuario: number;
  valoracion: number;
  comentario: string;
}

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {
  valoraciones: Valoracion[] = [];
  averageRating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private valoracionService: ValoracionService
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (bookId) {
      this.loadValoraciones(bookId);
    }
  }

  loadValoraciones(bookId: number): void {
    this.valoracionService.getValoracionesByBook(bookId).subscribe({
      next: (response) => {
        // Adaptar al formato de la respuesta
        this.valoraciones = response.filtros_aplicados || [];
        
        // Filtrar el promedio correspondiente al bookId actual
        const promedioLibro = response.promedios?.find((prom: any) => prom.id_libro === bookId);
        this.averageRating = promedioLibro?.promedio || null;
      },
      error: (error) => console.error('Error al cargar las valoraciones:', error)
    });
  }
  
}
