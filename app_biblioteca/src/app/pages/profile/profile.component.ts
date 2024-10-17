import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isAdmin: boolean = false; 
  ngOnInit() {
   
    const role = localStorage.getItem('role');
    
   
    if (role === 'admin') {
      this.isAdmin = true;
    }
  }
}
