import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Imagem, MostrandoService } from 'src/app/service/mostrando.service';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.page.html',
  styleUrls: ['./imagem.page.scss'],
})
export class ImagemPage implements OnInit {

imagens:Imagem[]=[];

  constructor(private service: MostrandoService , private modalCtrl: ModalController , private toastCtrl: ToastController) { }

  ngOnInit() {
    this.service.getAll().subscribe(response =>{
      this.imagens = response;
    })
  }

}
