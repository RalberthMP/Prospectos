import { Component, OnInit } from '@angular/core';
import { FileUploader, FileUploadModule,FileLikeObject } from 'ng2-file-upload';
import{Prospecto,ArchivosClass} from '../../model/clases'
import { ToolsProvider } from 'src/app/providers/tools/tools';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BaseUrl } from 'src/app/configuration/Configuration';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.page.html',
  styleUrls: ['./prospectos.page.scss'],
})
export class ProspectosPage implements OnInit {
//Pros:Prospecto;
Pros= new Prospecto();
Nombre:string;
PrimerApellido:string;
SegundoApellido:string;
Calle:string;
Numero:string;
Colonia:string;
CodigoPostal:number;
Telefono:string;
Comentarios:string;
  constructor(
    private tools: ToolsProvider,
    public MenuCtrl:MenuController,
    public http: HttpClient,
    private router: Router,
    public modalCtrl: ModalController,
   
    public AlertCtl: AlertController,
    private _HttpClient:HttpClient,
    public storage: Storage
  ) {
    this.tools.chekarToken();
   }

  ngOnInit() {
console.log("nuevo prosp")
  }
  ToogleMnu(){
    console.log("toggle");
    this.MenuCtrl.toggle();
  }
  Enviar(){
    console.log(this.Pros)
   var resp= this.Validacion();
   if (resp!="" && resp!=undefined  ) {//Si tiene info
      this.tools.ShowAlert("Alerta:","Falta datos:" + resp + " favor de completar info.")
    return;
    }
      this.storage.get("Token").then((token) => {


        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          }
        };
        let url = BaseUrl  + 'api/Prospecto/Guardar';
      
        this._HttpClient.post(url, this.Pros, config)
          .subscribe((RestData) => {
           
              console.log("Guardo Correctamente ");
              this.tools.ShowAlertBtnText("Prospectos","El prospectos se ha registrado correctamente","Ok")
             
              this.limpiar()
           
          }, (err) => {
      
            console.log("Error ", err);
            this.tools.ShowAlertBtnText("Error al guardar",err,"Ok")
          });
      
        });
    
  }
Validacion(){
  var FaltaInfo="";

  var TieneInfo="";
  var msg="Falta capturar: ";
    if (this.Pros.Nombre==undefined || this.Pros.Nombre=="" )
      FaltaInfo +=" nombre,";
    if (this.Pros.PrimerApellido==undefined || this.Pros.PrimerApellido=="" )
      FaltaInfo +=" primer apellido,";
    if (this.Pros.SegundoApellido==undefined || this.Pros.SegundoApellido=="" )
      FaltaInfo +=" segundo apellido,";
    if (this.Pros.Calle==undefined || this.Pros.Calle=="" )
      FaltaInfo+=" calle,";
    if (this.Pros.Numero==undefined || this.Pros.Numero=="" )
      FaltaInfo+=" numero,";  
    if (this.Pros.Colonia==undefined || this.Pros.Colonia=="" )
      FaltaInfo+=" colonia,";
    if (this.Pros.CodigoPostal==undefined )
      FaltaInfo+=" codigo postal,";
    if (this.Pros.RFC==undefined || this.Pros.RFC=="" )
      FaltaInfo+=" RFC,";


       if (FaltaInfo!="")
          return FaltaInfo

      return; 
}

ValidacionSalir(){
  var FaltaInfo="";

  var TieneInfo="";
  var msg="Falta capturar: ";
      if (this.Pros.Nombre!=undefined || this.Pros.Nombre!="" )
        TieneInfo ="Si";
      if (this.Pros.PrimerApellido!=undefined || this.Pros.PrimerApellido!="" )
        TieneInfo ="Si";
      if (this.Pros.SegundoApellido!=undefined || this.Pros.SegundoApellido!="" )
        TieneInfo ="Si";
      if (this.Pros.Calle!=undefined || this.Pros.Calle!="" )
         TieneInfo ="Si";
      if (this.Pros.Numero!=undefined || this.Pros.Numero!="" )
          TieneInfo ="Si";
      if (this.Pros.Colonia!=undefined || this.Pros.Colonia!="" )
           TieneInfo ="Si";
      if (this.Pros.CodigoPostal!=undefined )
          TieneInfo ="Si";
      if (this.Pros.RFC!=undefined || this.Pros.RFC!="" )
        TieneInfo ="Si";


       if (TieneInfo!="")
          return TieneInfo

      return; 
}
Cancelar(){
  var resp= this.ValidacionSalir();
  if (resp=="Si") //Si tiene info
  {
    this.presentAlertConfirm();
  }
}

async presentAlertConfirm() {

  const alert = await this.AlertCtl.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: 'Message <strong>Al salir se perderá la información</strong>!!!',
    buttons: [
      {
        text: 'Salir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Salimos');
          this.router.navigate(['/home'], { replaceUrl: true });
        }
      }, {
        text: 'Mantener',
        handler: () => {
          console.log('Mantener Okay');
        }
      }
    ]
  });
  await alert.present();
}
limpiar(){
  this.Pros.Calle="";
  this.Pros.CodigoPostal=undefined;
  this.Pros.Colonia="";
  this.Pros.Comentarios="";
  this.Pros.Nombre="";
  this.Pros.Numero="";
  this.Pros.PrimerApellido="";
  this.Pros.SegundoApellido="";
  this.Pros.RFC="";
  this.Pros.Status=="";
  this.Pros.Telefono="";

}
enviarfile(Achivos:ArchivosClass[])
{

  if (Achivos.length==0)
    return;

    //Achivos.forEach(item => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token
        }
      };

      let url = BaseUrl + 'api/Prospectos/upload';
      this._HttpClient.post(url, Achivos, config)
        .subscribe((RestData) => {

          console.log("Resultado", RestData);
          let Resultado = '';

            Resultado = RestData.toString().substring(0, 2);

          if (Resultado != 'OK')
            console.log("Error", RestData);
          else {

            console.log("Guardo Correctamente ");

          }
        }, (err) => {

          console.log("Error ", err);

        });

} 
}
