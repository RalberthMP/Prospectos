import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },



  {
    path: 'autorizar',
    loadChildren: () => import('./autorizar/autorizar.module').then( m => m.AutorizarPageModule)
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./pages/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },

  {
    path: 'prospectos',
    loadChildren: () => import('./pages/prospectos/prospectos.module').then( m => m.ProspectosPageModule)
  },
  {
    path: 'status',
    loadChildren: () => import('./pages/status/status.module').then( m => m.StatusPageModule)
  },
  {
    path: 'prospectos-alta',
    loadChildren: () => import('./pages/prospectos-alta/prospectos-alta.module').then( m => m.ProspectosAltaPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
