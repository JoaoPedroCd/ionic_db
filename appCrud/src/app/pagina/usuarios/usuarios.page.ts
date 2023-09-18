import { Component, OnInit } from '@angular/core';
import { UsuarioService , Usuario } from 'src/app/servico/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

usuarios: Usuario[] = [];

  constructor(private service: UsuarioService ) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      response =>{
        console.log(response);
        this.usuarios = response;
      }
    )
  }

}
