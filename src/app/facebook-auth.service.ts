import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  constructor(private Auth: AngularFireAuth) {
  }
  fbProvider = new auth.FacebookAuthProvider();
  loginWithFB() {
    this.Auth.auth.signInWithPopup(this.fbProvider)
    .then((result) => {
      console.log(result);
    })
    .catch(err => {
      console.log(err.message);
    })
  }

}

