import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TaskServiceProvider } from '../../providers/task-service/task-service';

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
  public items: Array<{ id: number, name: string,checked:number }> = [];
  list: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private taskServiceProvider: TaskServiceProvider,
    private alertCtrl: AlertController) {
    this.list = navParams.get('item');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MyTasksPage');
    this.taskServiceProvider.getData('tasks', this.list.id).subscribe(
      (data) => {
        console.log("tareas " + JSON.stringify(data));
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
      subTitle: "hubo un error con las tareas",
      buttons: ['Dismiss']
    }).present();
  }

  onEnterTask(taskName) {
    this.taskServiceProvider.postData({ name: taskName }, "tasks", this.list.id).subscribe(
      task => this.items.push({ id: task["id"], name: task["name"],checked:0 }),
      err => this.showError(err)
    );
  }

  onEditTask(task) {
    this.alertCtrl.create({
      title: "Actualizar Lista",
      subTitle: "Nombre Actual : " + task.name,
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
            this.taskServiceProvider.putData({ name: data.name }, "tasks/" + task["id"], this.list.id).subscribe(
              (data) => {
                let index = this.items.indexOf(task)
                this.items[index] = { id: data["id"], name: data["name"],checked:task.checked };
              },
            )
          }
        }
      ]

    }).present();
  }
  onDeleteTask(task) {
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
            let id = task["id"];
          this.taskServiceProvider.deleteData("tasks/" + id,this.list.id).subscribe(() => this.items.splice(this.items.indexOf(task), 1));
          }
        }
      ]

    }).present();
  }

  itemTapped(event, task) {
    alert("enviar estado checked? :"+task.checked)
  }

}
