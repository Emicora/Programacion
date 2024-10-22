import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { UserloginComponent } from './pages/userlogin/userlogin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { LoanDetailComponent } from './pages/loan-detail/loan-detail.component';
import { LibrarianComponent } from './pages/librarian/librarian.component';
import { HomelistComponent } from './pages/homelist/homelist.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { BookComponent } from './pages/book/book.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { SearchComponent } from './components/search/search.component';
import { ButtonComponent } from './components/button/button.component';
import { HomesinregComponent } from './pages/homesinreg/homesinreg.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { LoginnComponent } from './components/loginn/loginn.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoanListComponent } from './pages/loan-list/loan-list.component';

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
    EditProfileComponent,
    GoBackComponent,
    LoginnComponent,
    CreateUserComponent,
    LogoutComponent,
    LoanListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
