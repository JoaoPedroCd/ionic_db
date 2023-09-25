import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Criação de uma interface com o usuário
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  nivel: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // definição da url do api
  private url = 'http://localhost/api/usuario';

  constructor(private http: HttpClient) { }

  // método para retornar todos os usuários
  getAll(){
    return this.http.get<[Usuario]>(this.url); 
  }
  // método para remover usuário
  remove(id:any){
    return this.http.delete(this.url +'/'+id);
  }
  // método para adicionar usuários
  create(usuario: Usuario){
    return this.http.post(this.url, usuario);
  }
  // método para atualizar usuários
  update(usuario: Usuario, id: any){
    return this.http.put(this.url + '/' + id, usuario);
  }
  getEmail(email:any){
    return this.http.get(this.url +'/'+email);
  }
  getCpf(cpf:any){
    return this.http.get(this.url+'/'+cpf);
  }

}
