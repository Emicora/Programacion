import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Tipificar el array correctamente con las nuevas propiedades
  arrayUsuarios: Array<{ 
    id: number, 
    nombre: string, 
    mail: string, 
    fechaDeNacimiento: string,
    Rol: string,
    Pais: string,
    foto: string 
  }> = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Asignar el resultado de getUsuarios al arrayUsuarios
    this.arrayUsuarios = this.userService.getUsuarios();
  }
}
