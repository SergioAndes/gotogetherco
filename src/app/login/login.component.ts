import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/user.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(private authService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      correo: new FormControl('', [Validators.required,Validators.email]),
      contrasena: new FormControl()
    });
  }

  login() {
    const user = this.registerForm.get('correo').value;
    const pass = this.registerForm.get('contrasena').value;
    this.authService.loginUser(user, pass).subscribe(data => {
      console.log('urser', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',JSON.stringify(data.user));
      localStorage.setItem('images',JSON.stringify(data.profile));
      this.route.navigate(['profile']);

    },error => {
      Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
    });
  }

  get correo() { return this.registerForm.get('correo'); }

}
