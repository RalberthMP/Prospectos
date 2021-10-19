import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular'
import { HttpClientModule } from '@angular/common/http';
import { ToolsProvider } from './providers/tools/tools';
import { LoginProvider } from './providers/login/login.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FileUploadModule} from 'ng2-file-upload';
import { MultiFileUploadComponent } from '../app/components/multi-file-upload/multi-file-upload.component'
import{ HeaderComponent} from '././components/header/header.component'
@NgModule({
  declarations: [AppComponent,HeaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,    
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,FileUploadModule
  ],
  providers: [
    LoginProvider,
    ToolsProvider,
    NavParams,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
