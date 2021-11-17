import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = localStorage.getItem('token');
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) {
  }

  loginUser(user, pass): Observable<any> {
    return this.http.post(this.URL_HOST + 'users/login', {username: user, password: pass});
  }

  registerUser(form: any): Observable<any> {
    return this.http.post(this.URL_HOST + 'users/register', form);
  }

  updateUser(form: any, id: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("token", token);
    let headers = new HttpHeaders({'Authorization': 'Token ' + token});
    return this.http.patch(this.URL_HOST + 'users/update/' + id + '/', form, {'headers': headers});
  }

  updateUser1(user: any, tokenz: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("token", token);
    let headers = new HttpHeaders({'Authorization': 'Token ' + token});
    return this.http.patch(this.URL_HOST + 'users/update/' + user.id + '/', {
      username: user.username,
      notificationToken: tokenz
    }, {'headers': headers});
  }


  uploadImage(form: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({'Authorization': 'Token ' + token});
    return this.http.post(this.URL_HOST + 'users/profile/new/', form, {'headers': headers});
  }


  getUserById(id: any): Observable<any> {
    return this.http.get(this.URL_HOST + 'users/search/' + id);
  }

  getImages(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': 'Token ' + token});
    return this.http.get(this.URL_HOST + 'users/profile/' + id, {'headers': headers});
  }

  sendPushnotification(destino,body,title): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'key =AAAAWSL5_po:APA91bEZdsZ4_xB6d--I7JmQJ96t6ZVE5mt6rdVqS4Xvkl5EL6Rx0OAiecBWI2CMGj1C8XTmrZ8UAhGR8kEOH2UdOw1Zh3eRt_g17bjsKFVOfCfUunvts6V0a3KZ-HbxED39_xu-VlRp',
      'Content-Type': 'application/json'
    });
    return this.http.post('https://fcm.googleapis.com/fcm/send', {
      "notification": {
        "title": title,
        "body": body
      },
      "to": destino
    }, {'headers': headers});
  }


}

