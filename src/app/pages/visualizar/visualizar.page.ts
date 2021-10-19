import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { IonicStorageModule,Storage } from '@ionic/storage-angular';
import { BaseUrl } from 'src/app/configuration/Configuration';
import { ToolsProvider } from 'src/app/providers/tools/tools';
import{Prospecto} from '../../model/clases'
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./Tabla.scss'],
})
export class VisualizarPage implements OnInit {
  Pros= new Prospecto();
  ListaPros:Prospecto[]=[];
  Comentarios:string;
  TipoArchivo:any;
  NombreArchivo:any;
  url:any;
  constructor(
    private tools: ToolsProvider,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private _HttpClient:HttpClient,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.GetProspectos();
  }
GetProspectos(){

    this.storage.get("Token").then((token) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      
      console.log("Get prospectos");
      this.tools.CreateLoadingText("Cargando");
      this.http.get(BaseUrl + "api/Prospecto/GetProspectos", config).subscribe(
        (Response: any) => {
          

          this.ListaPros = Response;
          console.log("Get Prospectos " + this.ListaPros );
          this.tools.DismissLoading();
        },
        (error) => {
          this.tools.DismissLoading();
          console.log("Error", error);
        });
    });
  }
  EnviaAutorizaRechaza(ProsSel,Tipo){
    if (Tipo=='Rechazado')
      if (ProsSel.Comentarios=="" || ProsSel.Comentarios==undefined ){
        this.tools.ShowAlert ("Alerta","Debe escribir comantarios de rechazo");
        return;
      }
        
    console.log(ProsSel)
    ProsSel.Status=Tipo;
    //ProsSel.Comentarios=this.Comentarios;
      this.storage.get("Token").then((token) => {


        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          }
        };
        let url = BaseUrl  + 'api/Prospecto/AutorizaRechaza';
        this.tools.CreateLoadingText("Cargando");
        this._HttpClient.post(url, ProsSel, config)
          .subscribe((RestData) => {
           
              console.log("Guardo Correctamente ");
              this.tools.ShowAlertBtnText("Prospectos","El status ha sido modificado correctamente","Ok")
              this.GetProspectos();
           this.tools.DismissLoading();
          }, (err) => {
            this.tools.DismissLoading();
            console.log("Error ", err);
            this.tools.ShowAlertBtnText("Error al guardar",err,"Ok")
          });
      
        });
    
  }
  onSelectFile(event) {
    console.log(event.target.files);
    this.TipoArchivo=event.target.files;
    this.NombreArchivo=event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // console.log(event);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        var pos=this.url.toString().indexOf(',') +1;
        this.url = this.url.substring(pos, this.url.length);
         console.log(this.url);
  
      };
    }
  }
  // onFileSelected(event: EventEmitter<File[]>) {
  //   const file: File = event[0];
  //   console.log(file);
   
  // }
}
