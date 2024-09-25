import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav', 
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router) {}

  
  navigateHome() {
    const role = localStorage.getItem('role');
  
    if (role === 'admin') {
      this.router.navigate(['/homeadmin']);
    } else if (role === 'user') {
      this.router.navigate(['/home']);
    } else if (role === 'librarian') {
      this.router.navigate(['/homeadmin']);
    } else {
      console.error('No role found in localStorage');
    }
  }
  
}
