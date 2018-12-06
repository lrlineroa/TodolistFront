import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  jwt=localStorage.getItem("jwt");
  apiUrl=localStorage.getItem("apiUrl");
  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }
  getAllData(SharingListId) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
        
    return this.http.get(this.apiUrl+"users/sharing_list/"+SharingListId,options);
  }
}
