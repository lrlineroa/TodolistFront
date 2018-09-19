import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }


  postData(data, type) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
      
    const options = { headers: headers };
    let json = JSON.stringify(data);
    console.log(json);
    let apiUrl=localStorage.getItem("apiUrl");
    return this.http.post(apiUrl + type, json, options);
  }


}
