import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario, UsuarioService } from 'src/app/servico/usuario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.page.html',
  styleUrls: ['./addusuario.page.scss'],
})
export class AddusuarioPage implements OnInit {

  //o input abaixo recebe a interface usuário
  @Input() u!: Usuario;
  // variável para servir como um flag de atualização
  atualizar = false;
  // definindo variavel dados
  dados = {
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    nivel: '',
  }

  constructor(private modalCtrl: ModalController, private service: UsuarioService, private toastCtrl:ToastController) { }

  ngOnInit() {
    if (this.u) {
      this.atualizar = true;
      this.dados = this.u;
    }
  }

  async enviando(form: NgForm) {
    //console.log(form.value);
    const usuario = form.value;
    if (!usuario.nome||
        !usuario.email||
        !usuario.cpf||
        !usuario.senha||
        !usuario.nivel
      
      
      ) {
      this.mensagem('Por favor preencha todos os campos');
   
    } else if (this.atualizar) {
      this.service.update(usuario, this.u.id).subscribe(response => {
        // fechar o modal
        this.modalCtrl.dismiss(response);
      })
    }
    else {
      const emailExist = await firstValueFrom(this.service.getEmail(usuario.email));
      const cpfExist = await firstValueFrom(this.service.getCpf(usuario.cpf));
      if (emailExist){
      this.mensagem('Este email já existe.');
      }else if (cpfExist){
       this.mensagem('Este CPF já esta cadastrado');
        
        
        }else{
        this.service.create(usuario).subscribe(response => {
          //fecharModal()
          this.modalCtrl.dismiss(response);
        })
      }
      }
    }

    fecharModal(){
      this.modalCtrl.dismiss();
    }

    mensagem(msg:string){
      this.toastCtrl.create ({
        message: msg,
        duration: 2000
      }).then(toast =>{
        toast.present();
      })
    }

  }
