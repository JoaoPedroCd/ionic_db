import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { UsuariosService } from 'src/app/servico/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
dados ={
  email:'',
  senha:''
}
  constructor(private toastCtrl: ToastController , private service: UsuariosService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async logar(form:NgForm){
    const usuario = form.value;
    if (!usuario.email || !usuario.senha){
      this.mensagem('Por favor , preencha todos os campos.');
      return;
    }
    const loginExists = await firstValueFrom(this.service.getLogin(usuario.email, usuario.senha));
   
    if (loginExists){
      this.navCtrl.navigateRoot('produtos');

    }else{
      this.mensagem('Login inválido');
      console.log(loginExists);
    }
  }

mensagem(texto:string){
  this.toastCtrl.create({
    message:texto,
    duration:2000,
    color:'danger'
  }).then(toast =>{
    toast.present();
  }

  )
}

}
