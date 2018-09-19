import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  userData = {
    "name": "",
    "email": "",
    "username": "",
    "password": "",
    "password_confirmation": "",
    "role_id":2
  }
  constructor(
    private alertCtrl: AlertController,
    public authServiceProvider: AuthServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  
  signUp() {
    this.authServiceProvider.postData(this.userData, "users")
      .subscribe(
        data => {
          this.showNotification(data); this.navCtrl.push(LoginPage)

        },
        err => { console.log(err); this.showError(err) }
      );
  }
  showError(err): any {
    this.alertCtrl.create({
      title: "Registro Fallido",
      subTitle: err,
      buttons: ['Dismiss']
    }).present();
  }
  showNotification(data): any {
    console.log(data)
    this.alertCtrl.create({
      title: "Bienvenido " + data["name"],
      subTitle: "la vamos a pasar de lujo, inicia sesion",
      buttons: ['Ok']
    }).present();

  }
  

}
