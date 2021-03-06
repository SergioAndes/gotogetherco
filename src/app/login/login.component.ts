import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/user.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {FacebookAuthService} from "../facebook-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public registerForm: FormGroup;
  public token:any;
  constructor( private fbService: FacebookAuthService,private authService: UserService, private route: Router) {
    this.loginredirect()
  }

  ngOnInit(): void {

    this.token =localStorage.getItem("nochiveToken")
    console.log("token en ninit",this.token)
    this.registerForm = new FormGroup({
      correo: new FormControl('', [Validators.required,Validators.email]),
      contrasena: new FormControl()
    });
  }
  loginredirect(){
    if(localStorage.getItem("isLogged")=="true"){
      this.route.navigate(['/profile'])
    }
  }

  login() {

    const user = this.registerForm.get('correo').value.toLowerCase();
    const pass = this.registerForm.get('contrasena').value;
    this.authService.loginUser(user, pass).subscribe(data => {
      localStorage.setItem('token', data.token);
      this.setFirebaseNOtificationKey(data.user);
      console.log('urser', data);
      localStorage.setItem('isLogged', "true");
      if(localStorage.getItem('firstBrowse')!='false'){
        localStorage.setItem('firstBrowse', 'true');
      }
      if(localStorage.getItem('firstCreation')!='false'){
        localStorage.setItem('firstCreation', 'true');
      }
      localStorage.setItem('user',JSON.stringify(data.user));
      localStorage.setItem('images',JSON.stringify(data.profile));
      this.route.navigate(['profile']);

    },error => {
      Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
    });
  }

  get correo() { return this.registerForm.get('correo'); }

  setFirebaseNOtificationKey(user){

    this.authService.updateUser1(user,this.token).subscribe(data => {
      console.log("usuario actualizado",data)

    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });


  }

  logInFB() {
    this.fbService.loginWithFB();
  }

  goToRegister() {
    this.route.navigate(['/register'])
  }
}
