import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Usuários', url: 'usuarios', icon: 'people' },
    { title: 'Produtos', url: 'produtos', icon: 'storefront' },
    {title:'Login', url: 'login', icon: 'person-circle'},

  ];
  public labels = ['Versão 1.0', 'Senac - NIG', 'Tecnologia da Informação'];
  constructor() {}
}
