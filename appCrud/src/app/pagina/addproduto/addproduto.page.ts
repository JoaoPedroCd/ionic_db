import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
  }

  constructor(private modalCtrl : ModalController , private service : ProdutoService) { }

  ngOnInit() {
    if(this.a){
      this.atualizar = true;
      this.dados = this.a;
    }

  }
  enviando(form: NgForm){
    const produto = form.value;
    if(this.atualizar){
      this.service.update(produto,this.a.codigo).subscribe(response =>{
        this.modalCtrl.dismiss(response);
      }
        
        )
    }else{
      this.service.create(produto).subscribe(response =>{
        this.modalCtrl.dismiss(response);
      }
        
        )
    }
  }
  fecharModal(){
    this.modalCtrl.dismiss
  }

}
