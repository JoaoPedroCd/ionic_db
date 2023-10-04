import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



export interface Imagem{
  id:string;
  nome:string;
  path:string;
  data_upload:string;
}
@Injectable({
  providedIn: 'root'
})


export class MostrandoService {
  
  private url = 'http://localhost/upload/imagem';
  private isAuthenticate = false;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Imagem]>(this.url);
  }

}
