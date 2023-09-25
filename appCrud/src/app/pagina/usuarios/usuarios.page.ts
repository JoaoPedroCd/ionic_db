import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario, UsuarioService, } from 'src/app/servico/usuario.service';
import { AddusuarioPage } from '../addusuario/addusuario.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: Usuario[] = [];
  constructor(private service: UsuarioService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      response => {
        this.usuarios = response;
        //console.log(response);
      }
    )
  }

  remover(id: any) {
    this.service.remove(id).subscribe(() => {
      //depois de remover, quero que atualize a lista
      this.service.getAll().subscribe(
        response => {
          this.usuarios = response;
        }
      )
    }
    )
  }

  novoUsuario(){
    this.modalCtrl.create({
      component: AddusuarioPage
    }).then(modal => {
      modal.present();
      //esta instrução pega o retorno da página
      return modal.onDidDismiss();
    }).then(({data}) => {
      // fazemos o retorno das informações que estão no onOnInit
      this.service.getAll().subscribe(response =>{
        this.usuarios = response;
      });this.toastCtrl.create({
        message: 'Usuário cadastrado com sucesso',
        duration: 2000
      }).then(toast =>{
        toast.present();
      })
    })
  }


  atualizar(u: Usuario){
    this.modalCtrl.create({
      component: AddusuarioPage,
      //abaixo estamos passando o conteúdo de u
      componentProps: {u}
    }).then(modal => {  // veja que aqui para baixo, é justamente para atualizar após o retorno
      modal.present();
      return modal.onDidDismiss();
    }).then(({data}) => {
      this.service.getAll().subscribe(response =>{
        this.usuarios = response;
      })
    })
  }

}
