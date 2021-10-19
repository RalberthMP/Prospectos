
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from 'src/app/app.component';
import { BaseUrl } from 'src/app/configuration/Configuration';
import { Usuario } from 'src/app/model/interface';
import { LastConfiguration } from 'src/app/model/LastConfiguration/LastConfiguration';
import { LoginProvider } from 'src/app/providers/login/login.service';
import { ToolsProvider } from 'src/app/providers/tools/tools';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  InputType = 'password';
  eye = 'eye';
  LastConfigurationCompras: LastConfiguration;
  ClickedTimes=0;
  isLoading = false;
  Loading: any;
  public IsAdmin = false;

  constructor(
    public menu: MenuController,
    private router: Router,
    private _ToolsService: ToolsProvider,
    private _LoginService: LoginProvider,
    public storage: Storage,
    public naCtrl: NavController,
    public appcomponet: AppComponent,
    private platform: Platform,
    //public network: NetworkInformation,
    //public dialogs: Dialogs,
    private loadctrl: LoadingController,
  ) {
    this.ngOnInit();
    this.LastConfigurationCompras = new LastConfiguration();
    this.GetLastConfiguration();
    this._LoginService.isAuthentificated()
      .then((User: Usuario) => {
        if (User) {
          console.log(User);
          //this.guardar(User.Nombre, User.Codigo);
          this.menu.enable(true);
          this.router.navigate(['/home'], { replaceUrl: true });
        }
      });
  }

  GetLastConfiguration() {
    this._ToolsService.GetCollectionFromDevice('LastConfigurationCompras').then(
      ((LastConfigurationInDeviceString) => {
        const LastConfigurationInDevice: LastConfiguration = JSON.parse(LastConfigurationInDeviceString);
        if (LastConfigurationInDevice) {
          this.LastConfigurationCompras.User = LastConfigurationInDevice.User;
          this.LastConfigurationCompras.RememberPassword = LastConfigurationInDevice.RememberPassword;
          if (LastConfigurationInDevice.RememberPassword) {
            this.LastConfigurationCompras.Password = LastConfigurationInDevice.Password;
          }
        }
      }
      ));
  }

  ClickLogo() {
    this.ClickedTimes = this.ClickedTimes + 1;
    if (this.ClickedTimes === 10) {
      this.ClickedTimes = 0;
      //this._ToolsService.ShowAlertx('BaseUrl', BaseUrl);
    }
  }

  SaveLastConfiguration() {
    this._LoginService.SaveLastConfiguration(this.LastConfigurationCompras);
  }

  async crearLoading()
  {
    this.isLoading = true;
    return await this.loadctrl.create( { message: 'Please wait...',
    spinner: 'lines',
    backdropDismiss:true}).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dimissLoading(){
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadctrl.dismiss();
    }
    return null;
  }

  ChangeInputType() {
    if (this.InputType  === 'password') {
      this.InputType = 'text';
      this.eye = 'eye-off';
    } else {
      this.InputType = 'password';
      this.eye = 'eye';
    }
  }

  async ngOnInit() {
    //await this.storage.create();
    this.menu.enable(false);
  }

  Login() {
    if (this.LastConfigurationCompras.User == null)
      return;
    if (this.LastConfigurationCompras.Password == null)
      return;
      //this.crearLoading();
    this._LoginService.Login(this.LastConfigurationCompras)
      .then(async () => {
       
        this.SaveLastConfiguration();
        console.log("login correct");
        await this._LoginService.isAuthentificated()
          .then((User: Usuario) => {

          //   //this.guardar(User.Nombre, User.Codigo);
          //   if(User.Codigo == 4 || User.CodigoPerfil == 1){
          //     this.IsAdmin = true;
          //      this.appcomponet.isAdmin = true;
          //     // console.log('isAdmin', this.isAdmin);
          //     this.storage.set('isAdmin', this.IsAdmin)
          // } else { this.storage.set('isAdmin', this.IsAdmin)}
          });
         
        this.menu.enable(true);

        this.router.navigate(['/home']);
        //this.dimissLoading();
      }, (Error) => {
        //this.dimissLoading();
        console.log(Error);
       // if(Error.status==401)
      //  this._ToolsService.ShowAlertx("Error", "Usuario o contraseña incorrecta");
      //  else
      //  this._ToolsService.ShowAlertx("Error", Error.message);
      });
  }

}