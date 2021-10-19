import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBarPlugin } from '@capacitor/status-bar';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from './model/interface';
import { LoginProvider } from './providers/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Nuevos Prospectos', url: '/prospectos', icon: 'receipt' },
    { title: 'Autorizaciones', url: '/visualizar', icon: 'person' },
    { title: 'Status', url: '/status', icon: 'search' },
  ];
  
  constructor(    
    private platform: Platform,
    public storage: Storage,
    public router: Router,
    public login: LoginProvider,
    public menu: MenuController,
    public http: HttpClient,
    public alertController: AlertController,) {
      this.ngOnInit();
      this.initializeApp();
  }

  public NombeUsuario: string;
  isAdmin =false;

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });

    if (this.storage.get("LastConfigurationCompras") !== null && this.storage.get("UserCompras") !== null) {
      this.router.navigate(["/login"]);
    } else {

    }

    this.storage.get("UserCompras").then((user: Usuario) => {
      if (user != null) {
        this.login.LoggedUser = user;
      }
    });

    //this.admin()
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  salir() {
    this.login.Logout();
    this.menu.enable(false);
    // this.router.navigate(['/home']);
    //this.tool.CreateLoading(3000);
    this.router.navigate(["/login"]);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Mensaje",
      message: "¿Desea cerrar sesion?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.salir();
          },
        },
        {
          text: "No",
          handler: () => {
            console.log("Confirm Cancel: NO");
          },
        },
      ],
    });

    await alert.present();
  }


}
