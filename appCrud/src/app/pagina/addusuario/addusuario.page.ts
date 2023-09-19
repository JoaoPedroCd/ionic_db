import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Usuario, UsuarioService } from 'src/app/servico/usuario.service';
@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.page.html',
  styleUrls: ['./addusuario.page.scss'],
})
export class AddusuarioPage implements OnInit {

  //o input abaixo recebe a interface do usuario
  @Input() u!: Usuario;

  atualizar =false;

  dados={
    nome:'',
    email: '',
    cpf: '',
    senha: '',
    nivel: '',

  }


  constructor(private modalCtrl: ModalController , private service: UsuarioService) { }

  ngOnInit() {

    if(this.u){
      this.atualizar = true;
      this.dados = this.u;
    }

  }
enviando(form: NgForm){
const usuario = form.value;
if(this.atualizar){

this.service.update(usuario,this.u.id).subscribe(response=>{
  this.modalCtrl.dismiss(response);
}

  )
}else{
  this.service.create(usuario).subscribe(response =>{
    this.modalCtrl.dismiss(response);
  }

  )
}
}
fecharModal(){
  this.modalCtrl.dismiss();
}
}
