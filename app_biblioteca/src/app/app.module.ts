import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { UserloginComponent } from './pages/userlogin/userlogin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoanDetailComponent } from './pages/loan-detail/loan-detail.component';
import { LibrarianComponent } from './pages/librarian/librarian.component';
import { HomelistComponent } from './pages/homelist/homelist.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { BookComponent } from './pages/book/book.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { SearchComponent } from './search/search.component';
import { ButtonComponent } from './button/button.component';
import { HomesinregComponent } from './pages/homesinreg/homesinreg.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    UserloginComponent,
    ResetPasswordComponent,
    RegistroComponent,
    RecuperarComponent,
    ProfileComponent,
    LoanDetailComponent,
    LibrarianComponent,
    HomelistComponent,
    BookdetailComponent,
    BookComponent,
    AdminComponent,
    AddBookComponent,
    SearchComponent,
    ButtonComponent,
    HomesinregComponent,
    HomeadminComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
