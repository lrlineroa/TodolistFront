import { Component } from "@angular/core";




@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class BeautifulPage {
    
    constructor() {
		this.mivariable="hola mundo";
    }
    
    mivariable:string;

    mimetodo(){
        console.log(this.mivariable);
    }

}