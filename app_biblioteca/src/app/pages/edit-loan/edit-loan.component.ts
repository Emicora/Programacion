import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css']
})
export class EditLoanComponent implements OnInit {
  editForm!: FormGroup;
  loanId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loanId = id ? parseInt(id, 10) : null;

      if (this.loanId) {
        this.loadLoanDetails();
      }

      this.editForm = this.formBuilder.group({
        id_usuario: [{ value: '', disabled: true }, Validators.required],
        fecha_prestamo: ['', Validators.required],
        fecha_devolucion: ['', Validators.required],
        id_libro: ['', Validators.required]
      });
    });
  }

  loadLoanDetails(): void {
    if (this.loanId) {
      this.loanService.getLoanById(this.loanId).subscribe({
        next: (loan) => this.editForm.patchValue(loan),
        error: (error) => console.error("Error al cargar el préstamo:", error)
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.loanId !== null) {
      this.loanService.updateLoan(this.loanId, this.editForm.value).subscribe({
        next: () => {
          alert("Préstamo actualizado correctamente.");
          this.router.navigate(['/loanList']);
        },
        error: (error) => console.error("Error al actualizar el préstamo:", error)
      });
    }
  }
}
