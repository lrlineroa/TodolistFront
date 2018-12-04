import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListServiceProvider {
  
   userId:number;
   jwt=localStorage.getItem("jwt");
   apiUrl=localStorage.getItem("apiUrl");
  constructor(public http: HttpClient) {
    console.log('Hello ListServiceProvider Provider');
    this.userId=JSON.parse(localStorage.getItem("user"))["id"];
    console.log('userId: '+this.userId);
  }
  
  getData(uri) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
        
    return this.http.get(this.apiUrl+"users/"+this.userId+"/" + uri,options);
  }

  postData(data, uri) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
      
    let json = JSON.stringify(data);
    console.log(json);
    return this.http.post(this.apiUrl+"users/"+this.userId+"/" + uri, json, options);
  }

  putData(data, uri) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
      
    let json = JSON.stringify(data);
    console.log(json);
    
    return this.http.put(this.apiUrl+"users/"+this.userId+"/" + uri, json, options);
  }


  deleteData(uri: string): any {
    console.log("ELIMINARRRRRRRR");
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
        
    return this.http.delete(this.apiUrl+"users/"+this.userId+"/" + uri,options);
  }
  //type is view or edit
  grant(guestId: any, listId: any, type: string, value: boolean): any {
    let url=this.apiUrl+"users/"+
    this.userId+"/lists/"+listId+"/guest/"+guestId+"/"+type+"/"+(value?1:0)
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
    
    return this.http.post(url,null,options)
  }

}
