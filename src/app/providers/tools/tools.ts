//import { Http } from '@angular/http';
import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { ToastController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseUrl } from '../../configuration/Configuration';
//import { FileUploadOptions, FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoginProvider } from '../login/login.service';
import { Router } from '@angular/router';
import { OverlayBaseController } from '@ionic/angular/util/overlay';



@Injectable()
export class ToolsProvider {
  
    ShowAlertBtnText(Title: string, Message: string, BtnText: string) {
    return new Promise(async (resolve, reject) => {
      const alert = await this._AlertController.create({
        header: Title,
        subHeader: Message,
        buttons: [{
          text: BtnText,
          handler: () => {
            //resolve();
          }
        }],
      });
      await alert.present();
    });
  }
  

  Loading: any;
  constructor(
    private  _AlertController: AlertController,
    private _ToastController: ToastController,
    private _LoadingController: LoadingController,
    private _Menu: MenuController,
    //public _Login: LoginProvider,
    private _HttpClient: HttpClient,
    public _Router: Router,
    //public transfer: FileTransfer,    
    private _Storage: Storage) {
    //_Storage.create();

  }

  SaveInDevice(Item, CollectionName){
    return new Promise((resolve, reject) => {
      this._Storage.get(CollectionName).then( ItemsInCollection => {

        if (!ItemsInCollection){
          ItemsInCollection = [];
        }

        var UpdatedCollection: any[] = ItemsInCollection;
        UpdatedCollection.push(Item);
        this._Storage.set(CollectionName, UpdatedCollection);
        //resolve();
      });
    });
  }

  SaveCollectionInDevice(Collection, CollectionName: string){
    return new Promise((resolve, reject) => {
      this._Storage.set(CollectionName, Collection);
      resolve(Collection);
    });
  }
  
  UpdateOneItemInCollection(Item, Collection: any){
    var index = Collection.findIndex(item => item.ID == Item.ID);
    
    if (index != -1){
      Collection[index] = Item;
      return Collection;
    }else{
      throw 'No se encontró el elemento con ID ' + Item.ID + ' dentro de la collection';
    }
  }

  DeleteOneItemInCollection(Item, Collection: any[]){
    var index = Collection.indexOf(Item);
    if (index > -1) {
      Collection.splice(index, 1);
    } else {
      throw 'No se encontró el elemento con ID ${Item.ID} dentro de la collection';
    }
  }

  DeleteOneItemInCollectionParam(Item, Collection: any, PropiertyName: string){
    const index = Collection.findIndex(item => item[PropiertyName] == Item[PropiertyName]);
    console.log(index);
    // tslint:disable-next-line: triple-equals
    if (index != -1) {
      return Collection.splice(index, 1);
    } else {
      throw 'No se encontró el elemento con ID ' + Item[PropiertyName] + ' dentro de la collection';
    }
  }

  DeleteCollection(CollectionName) {
    return new Promise(async (resolve, reject) => {
      await this._Storage.set(CollectionName, null);
      //resolve();
    });
  }

  GetCollectionFromDevice(CollectionName) {
    return new Promise<string>((resolve, reject) => {
      this._Storage.get(CollectionName).then(Collection => {
        resolve(JSON.stringify(Collection));
      });
    })
  }

  GetCollectionFilterCodigo(StorageName, find) {
    this._Storage.get(StorageName).then(value => {
      var Res =  JSON.parse(JSON.stringify(value)).filter (elem => {
        return  elem.Codigo == find;
      });
    });
  }



  ShowAlert(Title, Message) {
    return new Promise(async (resolve, reject) => {
      const alert = await this._AlertController.create({
        header: Title,
        subHeader: Message,
        buttons: [{
          text: 'Ok',
          handler: () => {
            //resolve();
          }
        }],
      });
      alert.present();
    });
  }

  ShowAlertOptions(Title, Message, BtnTextLeft, BtnTextRight){
    return new Promise(async (resolve, reject) => {
      const alert = await this._AlertController.create({
        header: Title,
        subHeader: Message,
        buttons: [
          {
            text: BtnTextLeft,
            handler: () => {
              resolve(true);
            }
          },
          {
            text: BtnTextRight,
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      alert.present();
    });
  }

  AlertInputText(Title: string, Placeholder: string, BtnTextLeft: string, BtnTextRight: string) {

    return new Promise(async (resolve, reject) => {
      const alert = await this._AlertController.create({
        header: Title,
        inputs: [
          {
            name: 'Data',
            placeholder: Placeholder
          }
        ],
        buttons: [
          {
            text: BtnTextLeft,
            role: 'cancel',
            handler: data => {
              reject();
            }
          },
          {
            text: BtnTextRight,
            handler: data => {
              resolve(data);
            }
          }
        ]
      });
      alert.present();
    });
  }

  async  ShowToast(Message: string, Duration: number) {
    const toast = await  this._ToastController.create({
      message: Message,
      duration: Duration,
      position: 'bottom'
    });
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    toast.onDidDismiss();

    toast.present();
  }

  GetItemFromDevice(Key){
    return new Promise((resolve) => {
      this._Storage.get(Key).then(ItemInDevice => {
        resolve(ItemInDevice);
      });
    });
  }

  DeleteItemFromDevice(Key){
    return new Promise((resolve) => {
      this._Storage.set(Key, null).then(() => {
        //resolve();
      });
    });
  }

  async CreateLoading(time:number){
    this.Loading = await  this._LoadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
       duration: time
    });

    return await this.Loading.present();
  }

  async CreateLoading2(){
    this.Loading = await  this._LoadingController.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });

    return await this.Loading.present();
  }

  // async CreateLoadingInfinive(){

  //   this.Loading = await  this._LoadingController.create({
  //     message: 'Please wait...',
  //     spinner: 'lines',
  //   });

  //   await this.Loading.present();
  //   //await this.Loading.dismiss();
  // }

  async CreateLoadingText(LoadingText: string){
    this.Loading =  await this._LoadingController.create({
      message: LoadingText,
      spinner: 'crescent'
    });

    this.Loading.present();
    await this.Loading.dismiss();
  }

  async DismissLoading() {
     try {
      await this.Loading.dismiss();
    } catch (error) {
      await this._LoadingController.dismiss();
    }
   }

  GetCatalogoFromTH(Url: string) {
    return new Promise((resolve, reject) => {
      Url = BaseUrl + Url;
      let CustomHeaders = new HttpHeaders();
      CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');
      this._HttpClient.get(Url, {headers: CustomHeaders})
        .subscribe((Response: any) => {

          // if(!Array.isArray(Data)){
          //   Response.push(Data);
          // }else{
          //   Response = Data['Data'];
          // }

          resolve(Response.Data);
        }, (Error) => {
          console.log(Error);
          reject(Error);
        });
    });
  }


  DoPost(Url: string, Body: any){
      return new Promise((resolve, reject) => {
        let CustomHeaders = new HttpHeaders();
        CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');
        this._HttpClient.post(BaseUrl + Url, Body, {headers: CustomHeaders})
          .subscribe((Data) => {
            resolve(Data);
          }, (Error) => {
            reject(Error);
          })
      });
  }

  DoPostParams(Url: string, Body: any, UrlParamsObject: any){
      return new Promise((resolve, reject) => {
        let CustomHeaders = new HttpHeaders();
        CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');

        let CustomHttpParams = new HttpParams();
        Object.keys(UrlParamsObject).forEach( function(Key: string) {
          CustomHttpParams = CustomHttpParams.append(Key, UrlParamsObject[Key]);
        });

        this._HttpClient.post(BaseUrl + Url, Body, {headers: CustomHeaders, params: CustomHttpParams})
          .subscribe((Data) => {
            resolve(Data);
          }, (Error) => {
            reject(Error);
          })
      });
  }

  GetCatalogoFromTHParams(Url: string, UrlParamsObject: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Url = BaseUrl + Url;

      let CustomHttpParams = new HttpParams();

      Object.keys(UrlParamsObject).forEach(function(Key: string) {
        CustomHttpParams = CustomHttpParams.append(Key, UrlParamsObject[Key]);
      });

      let CustomHeaders = new HttpHeaders();
      CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');
      const v = this._HttpClient.get(Url, {headers: CustomHeaders, params: CustomHttpParams})
        .subscribe((Response: any) => {

          if (Array.isArray(Response)){
            resolve(Response);
          }

          const Data: any[] = [];
          if (Response.Data) {
            if (Array.isArray(Response.Data)) {
              Response.Data.forEach(element => {
                Data.push(element);
              });
            } else {
              Data.push(Response.Data);
            }
          }
        }, (Error) => {
          console.log(Error);
          reject(Error);
          console.log(v);
        });
    });
  }


  GetCatalogoFromTHParams2(Url: string, UrlParamsObject: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // Url = BaseUrl + Url;

      let CustomHttpParams = new HttpParams();

      Object.keys(UrlParamsObject).forEach(function(Key: string) {
        CustomHttpParams = CustomHttpParams.append(Key, UrlParamsObject[Key]);
      });

      let CustomHeaders = new HttpHeaders();
      CustomHeaders = CustomHeaders.append('Content-Type', 'application/json');
      const v = this._HttpClient.get(Url, {headers: CustomHeaders, params: CustomHttpParams})
        .subscribe((Response: any) => {

          if (Array.isArray(Response)){
            resolve(Response);
          }

          const Data: any[] = [];
          if (Response.Data){
            if (Array.isArray(Response.Data)) {
              Response.Data.forEach(element => {
                Data.push(element);
              });
            } else {
              Data.push(Response.Data);
            }
          }

        }, (Error) => {
          console.log(Error);
          reject(Error);
          console.log(v);
        });
    });


  }

  chekarToken() {
    console.log('Get Token');
    this._Storage.get("Token").then(token=>{
      if(token==null || token== undefined)
      {
          this.Logout();
          this._Menu.enable(false);
          this._Router.navigate(['/login']);
        return;
      }
      const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    console.log('Get Token');

    this._HttpClient.get(BaseUrl + 'api/Prospecto/CheckToken', config)
      .subscribe((Response: any) => {
        console.log('Token Correcto', Response);
      
      }, (error) => {
        if (error.status == 401 || error.status==500) {
          console.log('Unauthorized', error);
          this.Logout();
          this._Menu.enable(false);
          this._Router.navigate(['/login']);
        }
      });
    });

  }

  Logout() {
    this.DeleteItemFromDevice('UserCompras').then(() => {
      //this.menu.enable(false);
    });
    this.DeleteItemFromDevice('LastConfigurationCompras').then(() => {
    });
    this.DeleteItemFromDevice('Token').then(() => {
    });
  }

  // Show the loader for infinite time
  showLoader() {

    this._LoadingController.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    });

  }

  // Hide the loader if already created otherwise return error
  hideLoader() {

    this._LoadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      this._LoadingController.dismiss()
      console.log('error', error);
    });

  }

  UploadOneImage(Foto: any){
    // //return new Promise((resolve,reject)=>{
    //   const fileTransfer: FileTransferObject = this.transfer.create();
  
    //   let options: FileUploadOptions = {
    //     fileKey: 'photo',
    //     fileName: Foto.NombreFoto,
    //     chunkedMode: false,
    //     httpMethod: 'post',
    //     mimeType: "image/jpeg",
    //     headers: {}
    //   }

    //   fileTransfer.upload(Foto.Data, 'http://appembarcadores.tripleh.com.mx/api/upload',
    //       options, true)
    //       .then((data) => {
    //         Foto.Sincronizado=true;   
    //         console.log('Se subió foto');
    //         //resolve(Foto);
    //       },(err) => {
    //         Foto.Sincronizado=false;                
    //         console.log('ERror upload');
    //         //resolve(Foto);
    //       });
    // //});
  }
  
}
