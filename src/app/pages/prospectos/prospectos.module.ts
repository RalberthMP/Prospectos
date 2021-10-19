import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProspectosPageRoutingModule } from './prospectos-routing.module';

import { ProspectosPage } from './prospectos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProspectosPageRoutingModule
  ],
  declarations: [ProspectosPage]
})
export class ProspectosPageModule {}
