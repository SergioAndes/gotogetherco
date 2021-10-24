import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = localStorage.getItem('token');
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) { }

  loginUser(user, pass): Observable<any> {
    return this.http.post(this.URL_HOST + 'users/login', {username: user, password: pass});
  }

  registerUser(form: any): Observable<any> {
    return this.http.post(this.URL_HOST + 'users/register', form);
  }

  updateUser(form: any, id: any): Observable<any> {
    console.log("token",this.token);
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.patch(this.URL_HOST + 'users/update/'+id+'/', form,{'headers': headers});
  }

  uploadImage(form: any): Observable<any> {
    console.log("token",this.token);
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.post(this.URL_HOST + 'users/profile/new/', form,{'headers': headers});
  }


  getUserById(id: any): Observable<any> {
    return this.http.get(this.URL_HOST + 'users/search/'+ id);
  }

  getImages(id: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + this.token});
    return this.http.get(this.URL_HOST + 'users/profile/'+ id,{'headers': headers});
  }

}

