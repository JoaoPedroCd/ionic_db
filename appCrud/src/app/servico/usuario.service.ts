import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//criaçao de interface com usuario

export interface Usuario{
  id: string;
  nome:string;
  email:string;
  cpf:string;
  senha:string;
  nivel:string;
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //definição da url
  private url = 'http://localhost/api/usuario';

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<[Usuario]>(this.url);
    
  }
  remove(id:any){
    return this.http.delete(this.url+'/'+id);
  }
create(usuario: Usuario){
  return this.http.post(this.url, usuario);
}

}
