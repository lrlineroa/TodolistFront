import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {MyListsPage} from '../pages/my-lists/my-lists';
import {MyTasksPage} from '../pages/my-tasks/my-tasks';

import { OneSignal } from '@ionic-native/onesignal';
import { HttpClientModule  } from "@angular/common/http";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ListServiceProvider } from '../providers/list-service/list-service';
import { TaskServiceProvider } from '../providers/task-service/task-service';
@NgModule({
  declarations: [
    MyApp,LoginPage,
SignUpPage,
MyListsPage,
MyTasksPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,LoginPage,
SignUpPage,
MyListsPage,
MyTasksPage,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    OneSignal,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ListServiceProvider,
    TaskServiceProvider
  ]
})
export class AppModule {}
