import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(private authService: UserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      correo: new FormControl('', [Validators.required,Validators.email]),
      contrasena: new FormControl()
    });
  }

  login() {
    const user = this.registerForm.get('correo').value;
    const pass = this.registerForm.get('contrasena').value;
    console.log('urser', user);
    this.authService.loginUser(user, pass).subscribe(data => {
      localStorage.setItem('token', data.auth_token);
      localStorage.setItem('user',JSON.stringify(data.user));
      console.log('data', data);

    },error => {
      Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
    });


  }
  get correo() { return this.registerForm.get('correo'); }

}
