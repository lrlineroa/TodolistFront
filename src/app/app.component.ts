import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
// import { OneSignal } from '@ionic-native/onesignal';

import { AlertController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(
    // private alertCtrl: AlertController,
    public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    localStorage.setItem("apiUrl","http://localhost:3000/")
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // OneSignal Code start:
    // Enable to debug issues:
        //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      //   let alert = this.alertCtrl.create({
      //         title: jsonData["title"],
      //         subTitle: jsonData["body"],
      //         buttons: ['Dismiss']
      //   });
      //   alert.present();
      // };

      // window["plugins"].OneSignal
      //   .startInit("39871aaa-7b8e-45b4-b45e-da26ecfa3228", "100307042770")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();
    });

    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logOut(){
    localStorage.removeItem("user")
    localStorage.removeItem("jwt")
    this.nav.setRoot(LoginPage)
  }

  public isThereASession():boolean{
      return localStorage.getItem("jwt")!= undefined;
  } 
}
