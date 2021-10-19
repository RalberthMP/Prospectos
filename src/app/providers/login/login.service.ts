import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LastConfiguration } from '../../model/LastConfiguration/LastConfiguration';
import { BaseUrl } from '../../configuration/Configuration';
import { Usuario } from '../../model/interface';
import { ToolsProvider } from '../tools/tools';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginProvider {
 
  public LoggedUser: Usuario;
  constructor(
    public _Http: HttpClient,
    private _ToolsService: ToolsProvider,
    public menu: MenuController) {
    console.log('Hello LoginProvider Provider');
    this.LoggedUser= new Usuario();
  }

  Login(Login: LastConfiguration) {
    return new Promise((resolve, reject) => {
      if (!this.isValidLogin(Login)) {
        reject();
      }

      var CustomHeaders: HttpHeaders = new HttpHeaders();
      var Body = {
        User: Login.User,
        Password: Login.Password
      };
      CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');
      const config2 = {
       // headers: { 'Content-Type': 'application/json' }
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      };
      const config = {
        headers: { 'Content-Type': 'application/json' }
         };
      //
      let url = BaseUrl + 'api/Prospecto/Login';
       this._Http.post(url , Body, {headers: CustomHeaders})
      this._ToolsService.CreateLoadingText("Cargando");
      this._Http.post(url, Body, config)
        .subscribe((RestData: Usuario) => {
          //this._ToolsService.DismissLoading();
          this.LoggedUser = RestData;
          this._ToolsService.SaveCollectionInDevice(RestData[0], 'UserCompras');
          //  this._ToolsService.DismissLoading();
          this._ToolsService.SaveCollectionInDevice(RestData[0].Token, 'Token');
          resolve(RestData);
        }, (err) => {
          this._ToolsService.ShowAlert("Alerta:","El usuario o contraseña son incorrectos. ");
          reject(err);
          console.log(err);
          this.Logout();
        });
    });
  }

  Loginx(Login: LastConfiguration) {

    return new Promise((resolve, reject) => {
      if (!this.isValidLogin(Login)) {
        reject();
      }

      var CustomHeaders: HttpHeaders = new HttpHeaders();
       var Body = {
         User: Login.User,
         Password: Login.Password
       };

      CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');

      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const config2 = {

         headers: {'Content-Type':'application/x-www-form-urlencoded'}
       };

      //this.crearLoading();
      let url = BaseUrl + 'api/Prospecto/Login' ;
     // this._Http.post(url , Body, {headers: CustomHeaders})
      this._Http.post(url , Body, config)
          .subscribe((RestData: Usuario) => {
        //    this.dimissLoading();
            this.LoggedUser = RestData;
            this._ToolsService.SaveCollectionInDevice(RestData, 'UserAutorizaciones');
          //  this._ToolsService.DismissLoading();
            resolve(RestData);
          }, (err) => {
        //    this.dimissLoading();
        //    this._ToolsService.DismissLoading();
            reject(err);
            console.log(err);
            this.Logout();
          });
 
 
   });

}

  Logout() {
    this._ToolsService.DeleteItemFromDevice('UserCompras').then(() => {
      this.menu.enable(false);
    });
    this._ToolsService.DeleteItemFromDevice('LastConfigurationCompras').then(() => {      
    });
    this._ToolsService.DeleteItemFromDevice('Token').then(() => {      
    });
    this._ToolsService.DeleteItemFromDevice('isAdmin').then(() => {  
      //location.reload();    
    });
  }
  
  isValidLogin(Login: LastConfiguration): boolean {
    if (!Login.User) {
    //  this._ToolsService.ShowAlertx('Mensaje', 'El Usuario no puede estar en blanco');
      return false;
    }
    if (!Login.Password) {
      //  this._ToolsService.ShowAlertx('Mensaje', 'El Password no puede estar en blanco');
      return false;
    }
    return true;
  }

  SaveLastConfiguration(LastConfiguration: LastConfiguration) {
    this._ToolsService.SaveCollectionInDevice(LastConfiguration, 'LastConfigurationCompras');
  }

  isAuthentificated() {
    return new Promise((resolve, reject) => {
      this._ToolsService.GetItemFromDevice('UserCompras')
        .then((UserInDevice: Usuario) => {
          if (UserInDevice) {
            this.LoggedUser = UserInDevice;
            resolve(UserInDevice);
          }
        });
    });
  }

}
