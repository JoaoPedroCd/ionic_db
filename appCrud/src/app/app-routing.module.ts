import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },

  {
    path: 'usuarios',
    loadChildren: () => import('./pagina/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pagina/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
