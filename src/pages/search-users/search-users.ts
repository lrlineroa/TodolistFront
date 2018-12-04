import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  items: any[]=[];
  users: any[]=[];
  loggedInUserEmail: any;
  constructor(
    public navCtrl: NavController,
    private toastCtrl:ToastController, 
    private userServiceProvider:UserServiceProvider,
    private listServiceProvider:ListServiceProvider,
    public navParams: NavParams) {
    this.list=navParams.get('list');
    this.initializeUsers();
    this.loggedInUserEmail=JSON.parse(localStorage.getItem("user"))["email"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchUsersPage');
  }

  initializeUsers(){
    this.userServiceProvider.getAllData().subscribe(
      (data)=>{
        for(let i in data){
          this.users.push(data[i])
        }
      },
      error=>{
        this.showError(error);
      }
    )
  }
  showError(error: any): any {
    this.toast("error al leer los usuarios"+error);
  }

  getUsers(event){
    let val=event.target.value.toLowerCase();
    if(val && val.trim()!= ''){
      this.items = this.users.filter((item) => {
        return (item.email.toLowerCase().includes(val) && item.email!=this.loggedInUserEmail);
      })
    }else{
      this.onSearchCancel();
    }
    
  }

  onSearchCancel(){
    this.items.splice(0,this.items.length)
  }

  canViewThisList(user){
    // item.canView=!item.canView;
    //vamos a darle permiso al usuario
    this.listServiceProvider.grant(user.id,this.list.id,"visible",!user.canView).subscribe(
      data=>{
        this.updateUserGrants(user,data);
        this.toast("Se Actualizaron los permisos")
      },
      error=>{
        this.showError(error)
      }
    );
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
  updateUserGrants(user: any,data:any): any {
    console.log("datos \n"+ JSON.stringify(data));
    if(data.user_id==user.id){
      user.canEdit=data.can_edit
      user.canView=data.visible
    }else{
      this.toast("No hubo Cambios");
    }
    
  }
  canEditThisList(user){
    // item.canEdit=!item.canEdit
    // vamos a darle permiso al usuario
    this.listServiceProvider.grant(user.id,this.list.id,"can_edit",!user.canEdit).subscribe(
      data=>{
        this.updateUserGrants(user,data);
        this.toast("Se Actualizaron los permisos")
      },
      error=>{
        console.log("error \n"+JSON.stringify(error))
        this.showError(error)
      }
    );
  }

}
