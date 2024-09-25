import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private arrayUsuarios = [
    {
      id: 1,
      nombre: 'Emiliano',
      mail: 'emilianocoratolo@gmail.com',
      fechaDeNacimiento: '2002/01/25',
      Rol: 'Admin',
      Pais: 'Argentina',
      foto: 'Untitled.jpeg' 
    },
    {
      id: 2,
      nombre: 'Valentín',
      mail: 'valentincoratolo@gmail.com',
      fechaDeNacimiento: '2002/01/25',
      Rol: 'User',
      Pais: 'Argentina',
      foto: 'anime.jpeg'
    },
    {
      id: 3,
      nombre: 'Bruno',
      mail: 'brunopiastrellini@gmail.com',
      fechaDeNacimiento: '2002/12/10',
      Rol: 'Librarian',
      Pais: 'India',
      foto: 'images.jpeg'
    },
    {
      id: 4,
      nombre: 'Federico',
      mail: 'fedepalumbo@gmail.com',
      fechaDeNacimiento: '2002/04/29',
      Rol: 'User',
      Pais: 'Pakistan',
      foto: 'conejo.jpeg'
    }
    
  ];

  constructor() { }

  // Método para obtener la lista de usuarios
  getUsuarios() {
    return this.arrayUsuarios;
  }
}
