import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TaskServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskServiceProvider {
  
  jwt=localStorage.getItem("jwt");
  apiUrl=localStorage.getItem("apiUrl");
  constructor(public http: HttpClient) {
    console.log('Hello TaskServiceProvider Provider');
  }

  getData(uri,listId) {

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization': 'Bearer ' + this.jwt
      });

    const options = { headers: headers };

    return this.http.get(this.apiUrl + "lists/" + listId + "/" + uri, options);
  }

  postData(data, uri,listId) {

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization': 'Bearer ' + this.jwt
      });

    const options = { headers: headers };

    let json = JSON.stringify(data);
    console.log(json);
    return this.http.post(this.apiUrl + "lists/" + listId+ "/" + uri, json, options);
  }

  putData(data, uri,listId) {

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization': 'Bearer ' + this.jwt
      });

    const options = { headers: headers };

    let json = JSON.stringify(data);
    console.log(json);

    return this.http.put(this.apiUrl + "lists/" + listId + "/" + uri, json, options);
  }


  deleteData(uri: string,listId): any {
    console.log("ELIMINARRRRRRRR");

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization': 'Bearer ' + this.jwt
      });

    const options = { headers: headers };

    return this.http.delete(this.apiUrl + "lists/" +listId + "/" + uri, options);
  }

  sendNewState(userId,taskId,stateId): any {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization': 'Bearer ' + this.jwt
      });

    const options = { headers: headers };

    let json = JSON.stringify({});
    console.log(json);
    return this.http.post(this.apiUrl + "users/" + userId+ "/" +"tasks/" + taskId+"states/" + stateId, json, options);

  }

}
