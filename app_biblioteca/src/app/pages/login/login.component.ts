import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  
  loginAsAdmin() {
    localStorage.setItem('role', 'admin'); 
    this.router.navigate(['/admin']); 
  }


  loginAsUser() {
    localStorage.setItem('role', 'user'); 
    this.router.navigate(['/userlogin']); 
  }

  loginAsLibrarian() {
    localStorage.setItem('role', 'librarian'); 
    this.router.navigate(['/librarian']); 
  }
}
