import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




export interface Produto{
  codigo:string;
  nome:string;
  descricao:string;
  valor:string;
}

@Injectable({
  providedIn: 'root'
})




export class ProdutoService {



 //definição da url
 private url = 'http://localhost/api/produto';

 constructor(private http : HttpClient) { }

 getAll(){
   return this.http.get<[Produto]>(this.url);
 }



}
