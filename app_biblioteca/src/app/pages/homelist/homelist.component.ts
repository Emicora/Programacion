import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';

interface Loan {
  id_prestamo: number;
  fecha_prestamo: string;
  fecha_devolucion: string;
}

@Component({
  selector: 'app-homelist',
  templateUrl: './homelist.component.html',
  styleUrls: ['./homelist.component.css']
})
export class HomelistComponent implements OnInit {
  userLoans: Loan[] = [];
  selectedLoanId: number | null = null; // ID del préstamo seleccionado
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10; // Define el número de préstamos por página

  constructor(private loanService: LoanService, private router: Router) {}

  viewLoanDetails(loanId: number): void {
    this.router.navigate(['/loan', loanId]);
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  // Cargar préstamos del usuario
  loadLoans(): void {
    const id = Number(localStorage.getItem('id'));

    if (!id) {
      console.error("No se encontró el ID del usuario.");
      return;
    }

    this.loanService.getUserLoans(id, this.currentPage, this.perPage).subscribe({
      next: (response) => {
        this.userLoans = response.prestamos;
        this.totalPages = response.pages;
      },
      error: (error) => {
        console.error("Error al cargar los préstamos del usuario:", error);
      }
    });
  }

  // Seleccionar un préstamo para ver detalles
  selectLoan(loanId: number): void {
    this.selectedLoanId = loanId;
  }

  // Cancelar préstamo
  cancelLoan(loanId: number, event: Event): void {
    event.stopPropagation(); // Evitar que se active selectLoan
    this.loanService.cancelLoan(loanId).subscribe({
      next: () => {
        this.userLoans = this.userLoans.filter(loan => loan.id_prestamo !== loanId);
        if (this.selectedLoanId === loanId) {
          this.selectedLoanId = null; // Cierra el loan-card si se cancela el préstamo seleccionado
        }
      },
      error: (error) => {
        console.error("Error al cancelar el préstamo:", error);
      }
    });
  }

  // Paginación
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
}
