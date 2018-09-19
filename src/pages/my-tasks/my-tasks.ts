import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyTasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-tasks',
  templateUrl: 'my-tasks.html',
})
export class MyTasksPage {
  listName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listName = navParams.get('item').name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTasksPage');
  }

}
