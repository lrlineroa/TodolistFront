import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListServiceProvider {
  
   
   jwt=localStorage.getItem("jwt");
   apiUrl=localStorage.getItem("apiUrl");
  constructor(public http: HttpClient) {
    console.log('Hello ListServiceProvider Provider');
    
    

  }
  
  getData(uri,userId:number,listId?) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
    let id= listId?"/"+listId:""  
    return this.http.get(this.apiUrl+"users/"+userId+"/" + uri+id,options);
  }

  postData(data,userId:number, uri) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
      
    let json = JSON.stringify(data);
    return this.http.post(this.apiUrl+"users/"+userId+"/" + uri, json, options);
  }

  putData(data,userId:number, uri) {
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
      
    let json = JSON.stringify(data);
    
    return this.http.put(this.apiUrl+"users/"+userId+"/" + uri, json, options);
  }


  deleteData(uri: string,userId:number): any {
    console.log("ELIMINARRRRRRRR");
    
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
        'Authorization':'Bearer '+this.jwt
      });
      
    const options = { headers: headers };
        
    return this.http.delete(this.apiUrl+"users/"+userId+"/" + uri,options);
  }
  //type is view or edit
  grant(ownerId:number,guestId: number, listId: number, type: string, value: boolean): any {
    let url=this.apiUrl+"users/"+
    ownerId+"/lists/"+listId+"/guest/"+guestId+"/"+type+"/"+(value?1:0)
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
