import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MyListsPage } from '../my-lists/my-lists';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	credentials: FormGroup

	constructor(
		private authServiceProvider:AuthServiceProvider,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		private fB: FormBuilder, public navParams: NavParams) {
		this.credentials = this.fB.group({
			email: new FormControl('', Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])),
			password: ['', Validators.required],

		});
	}

	ionViewDidLoad() {
		console.log("login")
	}
	ionViewWillEnter(){
		
		let user=localStorage.getItem("user");
		let jwt=localStorage.getItem("jwt");
		if(user && jwt ){
			this.navCtrl.setRoot(MyListsPage);
		}
	}
	login() {
		let userData={
			auth:{
				email:this.credentials.value.email,
				password:this.credentials.value.password
			}
		}
		//console.log(this.credentials);
		//console.log(userData);
		this.authServiceProvider.postData(userData, "user_token")
			.subscribe(
				data => {
					console.log("respuesta login")
					console.dir(data);
					localStorage.setItem('user', JSON.stringify(data["user"]));
					localStorage.setItem('jwt', data["jwt"]);
					this.showNotification(data); 
					this.navCtrl.setRoot(MyListsPage);

				},
				err => { console.log(err); this.showError(err) }
			);
		
	}

	goSignUp() {
		this.navCtrl.push(SignUpPage);
	}

	showError(err): any {
		let errors={
			404:"No encontramos coincidencias"
		}
		this.alertCtrl.create({
			title: "Oppps",
			subTitle: errors[err.status],
			buttons: ['Dismiss']
		}).present();
	}
	showNotification(data): any {
		console.log(data)
		this.alertCtrl.create({
			title: "Bienvenido "+ data.user.name,
			subTitle: "Ya puedes ver tus listas\n",
			buttons: ['Ok']
		}).present();

	}


}
