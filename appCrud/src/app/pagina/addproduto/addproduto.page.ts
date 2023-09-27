import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Produto, ProdutoService } from 'src/app/servico/produto.service';


@Component({
  selector: 'app-addproduto',
  templateUrl: './addproduto.page.html',
  styleUrls: ['./addproduto.page.scss'],
})
export class AddprodutoPage implements OnInit {

  
  @Input() a! : Produto;

  atualizar = false;

  dados={
    nome:'',
    descricao:'',
    valor:'',
    serie:'',
  }

  constructor(private modalCtrl : ModalController , private service : ProdutoService , private toastCtrl:ToastController) { }

  ngOnInit() {
    if(this.a){
      this.atualizar = true;
      this.dados = this.a;
    }

  }
  async enviando(form: NgForm){
    const produto = form.value;

    if(!produto.nome|| 
      !produto.descricao||
      !produto.valor||
      !produto.serie
      ){
        this.mensagem('Por favor Preencha todos os canpos');
      }else if (this.atualizar) {
        this.service.update(produto, this.a.codigo).subscribe(response =>{
          this.modalCtrl.dismiss(response);
        }

        )
      }else {
        const serieExist = await firstValueFrom(this.service.getSerie(produto.serie));

        if (serieExist){
          this.mensagem('Esse produto tem o numero de serie cadastrado');

        }else{
          this.service.create(produto).subscribe(response =>{
            this.modalCtrl.dismiss(response);
            
          }

          )
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
