import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProspectosAltaPageRoutingModule } from './prospectos-alta-routing.module';

import { ProspectosAltaPage } from './prospectos-alta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProspectosAltaPageRoutingModule
  ],
  declarations: [ProspectosAltaPage]
})
export class ProspectosAltaPageModule {}
