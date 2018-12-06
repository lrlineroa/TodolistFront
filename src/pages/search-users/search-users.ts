import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, ViewController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ListServiceProvider } from '../../providers/list-service/list-service';

/**
 * Generated class for the SearchUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-users',
  templateUrl: 'search-users.html',
})
export class SearchUsersPage {
  list: any;
  items: any[] = [];
  users: any[] = [];
  loggedInUserEmail: any;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private userServiceProvider: UserServiceProvider,
    private listServiceProvider: ListServiceProvider,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
    this.list = navParams.get('list');
    this.initializeUsers();
    this.loggedInUserEmail = JSON.parse(localStorage.getItem("user"))["email"];
  }

  ionViewDidLoad() {
    console.log("ionload search users")

  }

  initializeUsers() {
    //si la lista ya est'a siendo compartida entonces en el array items
    //hay que poner list
    console.log("lista "+ this.list.name)
    console.dir(this.list)
    this.list.users_lists.forEach((element,idx,array) => {
      if(!element.is_owner){
        this.list.users[idx].canView=element.visible
        this.list.users[idx].canEdit=element.can_edit
        this.items.push(this.list.users[idx]);
        // this.list.users.forEach(element2 => {

        //   if(element2.id==element.user_id){
        //     element2.canView=element.visible
        //     element2.canEdit=element.can_edit
        //     this.items.push(element2)
        //   }
        // });
        
        
      }
      
      
    });
    this.userServiceProvider.getAllData(this.list.id).subscribe(
      (data) => {
        for (let i in data) {
          // console.log("usuario "+i+":\n"+JSON.stringify(data[i]))
          let user=data[i]
          if(this.list.users_lists.length>0){
            // console.log("entro")
            this.list.users_lists.forEach(element => {
              // console.log("va a entrar "+user.name +" = "+(element["user_id"]==user.id && user.email != this.loggedInUserEmail))
              if(element["user_id"]==user.id && user.email != this.loggedInUserEmail){
                console.log("elemento "+ JSON.stringify(element))
                user.canView=element["visible"];
                user.canEdit=element["can_edit"]
              }
            });
            
          }
          this.users.push(user)
        }
      },
      error => {
        this.showError(error);
      }
    )
  }
  showError(error: any): any {
    // console.log("error\n"+JSON.stringify(error));
    this.toast("error al leer los usuarios" + error);
  }

  getUsers(event) {
    let val = event.target.value.toLowerCase();
    if (val && val.trim() != '') {
      this.items = this.users.filter((item) => {
        return (item.email.toLowerCase().includes(val) && item.email != this.loggedInUserEmail);
      })
    } else {
      this.onSearchCancel();
    }

  }

  onSearchCancel() {
    this.items.splice(0, this.items.length)
  }

  canViewThisList(user) {
    this.alertCtrl.create({
      title: "Aviso",
      subTitle: "Estás Seguro?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: data => {
            // item.canView=!item.canView;
            //vamos a darle permiso al usuario
            this.listServiceProvider.grant(user.id, this.list.id, "visible", !user.canView).subscribe(
              data => {
                this.updateUserGrants(user, data);
                this.toast("Se Actualizaron los permisos")
              },
              error => {
                this.showError(error)
              }
            );
          }
        }
      ]
    }).present();
  }
  toast(message: string): any {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  updateUserGrants(user: any, data: any): any {
    // console.log("datos \n" + JSON.stringify(data));
    
    
    if (data.user_id == user.id) {
      //se actualiza los permisos de la lista
      let updated=false //flag para ver si se actualiz'o
      this.list.users_lists.forEach((element,idx,array) => {

        if(element.user_id==user.id){
          //si el usuario ya no puede ver la lista entonces ya no hay permisos 
          //y se removera el item de users_lists en list
          //de lo contrario solo actual'icelo
          if(!data.visible){
            array.splice(idx,1)
            this.list.users.splice(idx,1)
          }else{
            element.visible=data.visible
            element.can_edit=data.can_edit
          }
          
          updated=true
        }
      });
      //si no hay ningun registro entonces toca anadirlo al array 
      //users_lists de list
      if(!updated){
        this.list.users_lists.unshift(data)
        this.list.users.unshift(user)
      }
      //se actualiza los permisos del usuario
      user.canEdit = data.can_edit
      user.canView = data.visible
    } else {
      this.toast("No hubo Cambios");
    }

  }
  canEditThisList(user) {
    this.alertCtrl.create({
      title: "Aviso",
      subTitle: "Estás Seguro?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: data => {
            // item.canView=!item.canView;
            //vamos a darle permiso al usuario
            this.listServiceProvider.grant(user.id, this.list.id, "can_edit", !user.canEdit).subscribe(
              data => {
                this.updateUserGrants(user, data);
                this.toast("Se Actualizaron los permisos")
              },
              error => {
                console.log("error \n" + JSON.stringify(error))
                this.showError(error)
              }
            );
          }
        }
      ]
    }).present();
    // item.canEdit=!item.canEdit
    // vamos a darle permiso al usuario
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
