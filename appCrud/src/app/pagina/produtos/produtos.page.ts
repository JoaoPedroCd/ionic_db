import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Produto, ProdutoService } from 'src/app/servico/produto.service';
import { AddprodutoPage } from '../addproduto/addproduto.page';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],

})
export class ProdutosPage implements OnInit {

  constructor(private service: ProdutoService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }
  produtos: Produto[] = [];
  ngOnInit() {
    this.service.getAll().subscribe(
      response => {
        //console.log(response);
        this.produtos = response;
      }
    )
  }
  remover(codigo: any) {
    this.service.remove(codigo).subscribe(() => {
      this.service.getAll().subscribe(
        response => {
          this.produtos = response;
        }
      )
    }

    )

  }
  novoProduto() {
    this.modalCtrl.create({
      component: AddprodutoPage
    }).then(
      modal => {
        modal.present()
        return modal.onDidDismiss();
      }

    ).then(({ data }) => {
      this.service.getAll().subscribe(response => {
        this.produtos = response;
      }

      );
      this.toastCtrl.create({
        message: 'Produto Cadastrado',
        duration: 3000
      }).then(toast => {
        toast.present();
      }

      )
    }

    )
  }
  atualizar(a: Produto) {
    this.modalCtrl.create({
      component: AddprodutoPage,
      componentProps: { a }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }
    ).then(({ data }) => {
      this.service.getAll().subscribe(response => {
        this.produtos = response;
      }

      );
      this.toastCtrl.create({
        message: "Produto Atualizado",
        duration: 3000
      }).then(toast => {
        toast.present();
      }

      )
    }

    )
  }

}
