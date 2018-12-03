import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  public states: Array<String>=[];
  list: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private taskServiceProvider: TaskServiceProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
    this.list = navParams.get('item');
    this.states=['Uncompleted','Completed','Suspended']
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MyTasksPage');
    this.taskServiceProvider.getData('tasks', this.list.id).subscribe(
      (data) => {
        console.log("tareas " + JSON.stringify(data));
        for (let i in data) {
          let task= data[i];
          let statesLength=task.states.length
          if(statesLength==0){
            task.checked=0
          }else{
            let lastState=task.states[statesLength-1]
            if(lastState.state=="Completed"){
              task.checked=1
            }
          }
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
    let state= task.checked?'Completed':'Uncompleted';
    let userId=JSON.parse(localStorage.getItem("user"))["id"];
    let stateIdInDb=this.states.indexOf(state)+1 // al id se le suma 1 porque los ids de la base de datos comienzan en 1
    this.taskServiceProvider.sendNewState(userId,task.id,stateIdInDb).subscribe(
      data=>{
              console.log("response for state change:\n"+JSON.stringify(data))
              let message="";
              if(data.user_id==userId && 
                data.task_id==task.id &&
                data.state_id==stateIdInDb){
                 message='Estado cambiado satisfactoriamente'
                }else{
                  message='App Crash, Inconsistencia de datos enviando estado'
                }

                let toast = this.toastCtrl.create({
                  message: message,
                  duration: 3000,
                  position: 'bottom'
                });
              
                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });
              
                toast.present();
            },
      error=>{
        alert(JSON.stringify(error))
      }
      );
  }

}
