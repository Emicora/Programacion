import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { HomelistComponent } from './pages/homelist/homelist.component';
import { LoanDetailComponent } from './pages/loan-detail/loan-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { BookComponent } from './pages/book/book.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LibrarianComponent } from './pages/librarian/librarian.component';
import { HomesinregComponent } from './pages/homesinreg/homesinreg.component';
import { UserloginComponent } from './pages/userlogin/userlogin.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LoanListComponent } from './pages/loan-list/loan-list.component';
import { LoanCardComponent } from './pages/loan-card/loan-card.component';
import { EditLoanComponent } from './pages/edit-loan/edit-loan.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';


const routes: Routes = [
  { path: 'homesinreg', component: HomesinregComponent }, // Accesible sin token
  { path: 'bookdetail/:id', component: BookdetailComponent }, // Accesible sin token
  { path: 'admin', component: AdminComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Requiere token
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian', 'user'] }},
  { path: 'homeadmin', component: HomeadminComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  { path: 'homelist', component: HomelistComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian', 'user'] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  { path: 'books', component: BookComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  { path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  { path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  { path: 'edit-book/:id', component: EditBookComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'librarian'] } },
  
  // Rutas por defecto o sin rol específico
  { path: 'loandetail/:id', component: LoanDetailComponent, canActivate: [AuthGuard] },
  { path: 'loan/:id', component: LoanCardComponent, canActivate: [AuthGuard] },
  { path: 'loanList', component: LoanListComponent, canActivate: [AuthGuard] },
  { path: 'editLoan/:id', component: EditLoanComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: '', redirectTo: '/homesinreg', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
