import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ListServiceProvider } from '../../providers/list-service/list-service';
import { MyTasksPage } from '../my-tasks/my-tasks';

/**
 * Generated class for the MyListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-lists',
  templateUrl: 'my-lists.html',
})
export class MyListsPage {
  public items: Array<{ id: number, name: string }> = [];
  constructor(
    private alertCtrl: AlertController,
    private listServiceProvider: ListServiceProvider
    , public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyListsPage');
    this.listServiceProvider.getData('lists').subscribe(
      (data) => {
        console.log("listas " + JSON.stringify(data));
        for (let i in data) {
          this.items.push(data[i]);
        }
      }
      ,
      (error) => { this.showError(error) }
    );
  }

  showError(error) {
    console.log(error)
    this.alertCtrl.create({
      title: "Oppps",
      subTitle: "hubo un error con las listas",
      buttons: ['Dismiss']
    }).present();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MyTasksPage, {
      item: item
    });
  }

  onEnterList(value) {
    this.listServiceProvider.postData({ name: value }, "lists").subscribe(
      list => this.items.push({ id: list["id"], name: list["name"] }),
      err => this.showError(err)
    );
  }

  onEditList(item) {
    this.alertCtrl.create({
      title: "Actualizar Lista",
      subTitle: "Nombre Actual : " + item.name,
      inputs: [
        {
          name: 'name',
          placeholder: "Nuevo nombre"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.listServiceProvider.putData({ name: data.name }, "lists/" + item["id"]).subscribe(
              (data) => { 
                let index= this.items.indexOf(item)
                this.items[index]={id:data["id"],name:data["name"]};
              },
            )
          }
        }
      ]
      
    }).present();
  }
  onDeleteList(item) {
    this.alertCtrl.create({
      title: "Aviso",
      subTitle: "Estás Seguro para eliminar ?? ",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            let id = item["id"];
            this.listServiceProvider.deleteData("lists/" + id).subscribe(() => this.items.splice(this.items.indexOf(item), 1));
            }
        }
      ]
      
    }).present();
    
  }
   
}
