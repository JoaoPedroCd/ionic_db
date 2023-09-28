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
  onlyNumbers: any = RegExp('^[0-9]+$');


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

  constructor(private modalCtrl: ModalController, private service: UsuarioService, private toastCtrl: ToastController) { }

  ngOnInit() {
    if (this.u) {
      this.atualizar = true;
      this.dados = this.u;
    }
  }


  async enviando(form: NgForm) {
    let cpfExist;
    let msg: string = '';
    const usuario = form.value;
    if (!usuario.nome ||
      !usuario.email ||
      !usuario.cpf ||
      !usuario.senha ||
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

      if (emailExist) {
        this.mensagem('Este email já existe.');
      } else if (this.onlyNumbers.test(usuario.cpf)) {

        usuario.cpf = this.getCpfFormated(usuario.cpf);

        cpfExist = await firstValueFrom(this.service.getCpf(usuario.cpf));
        
      }else if (cpfExist) {
          this.dados.cpf = '';
          msg = 'este cpf existe';
        }
     
      else {
        this.service.create(usuario).subscribe(response => {
          //fecharModal()
          this.modalCtrl.dismiss(response);
        })
      }
    }


  }




  fecharModal() {
    this.modalCtrl.dismiss();
  }

  mensagem(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }
  getCpfFormated(cpf: string): string {

    let cpfGroup: Array<string> = [
      `${cpf[0]}${cpf[1]}${cpf[2]}`,
      `${cpf[3]}${cpf[4]}${cpf[5]}`,
      `${cpf[6]}${cpf[7]}${cpf[8]}`,
      `${cpf[9]}${cpf[10]}`

    ];
    let formattedCpf: string = `${cpfGroup[0]}.${cpfGroup[1]}.${cpfGroup[2]}-${cpfGroup[3]}`;
    return formattedCpf;


  }

}


