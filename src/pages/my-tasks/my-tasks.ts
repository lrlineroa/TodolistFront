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
  public items: Array<{ id: number, name: string }> = [];
  listName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listName = navParams.get('item').name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTasksPage');
  }

  onEnterTask(taskName) {
    alert("oo que chevere vamos a ingresar " + taskName);
  }

  onEditTask(task) {

  }
  onDeleteTask(task) {

  }

}
