import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from 'src/app/servico/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  constructor(private service : ProdutoService ) { }
produtos: Produto[] = [];
  ngOnInit() {
    this.service.getAll().subscribe(
      response =>{
        console.log(response);
        this.produtos = response;
      }
    )
  }

}
