import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectosAltaPage } from './prospectos-alta.page';

const routes: Routes = [
  {
    path: '',
    component: ProspectosAltaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectosAltaPageRoutingModule {}
