import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  arrayPrestamos: any[] = [];
  searchCriteria: any = { fecha_prestamo: '', fecha_devolucion: '' };
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans(this.currentPage, 10, this.searchCriteria.fecha_prestamo, this.searchCriteria.fecha_devolucion).subscribe({
      next: (response) => {
        this.arrayPrestamos = response.prestamos || [];
        this.totalPages = response.pages || 1;
      },
      error: (error) => console.error("Error al cargar los préstamos:", error)
    });
  }

  onSearchClick(): void {
    this.currentPage = 1;
    this.loadLoans();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoans();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoans();
    }
  }

  goToEditLoan(loanId: number): void {
    // Redirigir a la página de edición con el ID del préstamo
    this.router.navigate(['/editLoan', loanId]);
  }

  deleteLoan(loanId: number, bookId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este préstamo?')) {
      // Obtener detalles del libro asociado al préstamo
      this.loanService.getBookById(bookId).subscribe({
        next: (book) => {
          const updatedDisponibles = book.disponibles + 1;
  
          // Eliminar el préstamo
          this.loanService.cancelLoan(loanId).subscribe({
            next: () => {
              // Actualizar disponibilidad del libro
              this.loanService.updateBookAvailability(bookId, { disponibles: updatedDisponibles }).subscribe({
                next: () => {
                  alert('Préstamo eliminado y disponibilidad del libro actualizada.');
                  // Actualizar la lista de préstamos en el frontend
                  this.arrayPrestamos = this.arrayPrestamos.filter(loan => loan.id_prestamo !== loanId);
                },
                error: (error) => {
                  console.error('Error al actualizar la disponibilidad del libro:', error);
                  alert('Préstamo eliminado, pero no se pudo actualizar la disponibilidad del libro.');
                }
              });
            },
            error: (error) => {
              console.error('Error al eliminar el préstamo:', error);
              alert('Error al eliminar el préstamo.');
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener los detalles del libro:', error);
          alert('No se pudo obtener los detalles del libro asociado al préstamo.');
        }
      });
    }
  }
  

  
}
