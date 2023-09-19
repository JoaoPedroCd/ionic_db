import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService , Usuario } from 'src/app/servico/usuario.service';
import { AddusuarioPage } from '../addusuario/addusuario.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

usuarios: Usuario[] = [];

  constructor(private service: UsuarioService , private modalCrtl: ModalController ) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      response =>{
        console.log(response);
        this.usuarios = response;
      }
    )
  }
  remover(id:any){
    this.service.remove(id).subscribe(()=>{
      this.service.getAll().subscribe(
        response=>{
          this.usuarios = response;
        }
      )
    }
    )
  }
  novoUsuario(){
    this.modalCrtl.create({
      component:AddusuarioPage
    }).then(
      modal => modal.present()
      
    );

  }

}
