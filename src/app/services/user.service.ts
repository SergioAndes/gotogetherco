import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) { }

  loginUser(user, pass): Observable<any> {
    return this.http.post(this.URL_HOST + 'users/login', {username: user, password: pass});
  }

  registerUser(form: any): Observable<any> {
    return this.http.post(this.URL_HOST + 'users/register', form);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(this.URL_HOST + 'users/register/'+ id);
  }

}

