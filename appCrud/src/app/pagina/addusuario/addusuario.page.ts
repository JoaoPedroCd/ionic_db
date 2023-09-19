import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servico/usuario.service';
@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.page.html',
  styleUrls: ['./addusuario.page.scss'],
})
export class AddusuarioPage implements OnInit {

  constructor(private modalCtrl: ModalController , private service: UsuarioService) { }

  ngOnInit() {
  }
enviando(form: NgForm){
const usuario = form.value;
this.service.create(usuario).subscribe(response=>{
  this.fecharModal();
}
  )
}
fecharModal(){
  this.modalCtrl.dismiss();
}
}
