import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { IonicStorageModule,Storage } from '@ionic/storage-angular';
import { BaseUrl } from 'src/app/configuration/Configuration';
import { ToolsProvider } from 'src/app/providers/tools/tools';
import{Prospecto} from '../../model/clases'

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./Tabla.scss'],
})
export class StatusPage implements OnInit {
  Pros= new Prospecto();
  ListaPros:Prospecto[]=[];
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
      this.http.get(BaseUrl + "api/Prospecto/GetProspectosTodos", config).subscribe(
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
}
