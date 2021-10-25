import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: Router,private authService: UserService,private formBuilder: FormBuilder) { }

  public registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registerUser(){
    console.log("log",this.registerForm.value)
    this.authService.registerUser(this.registerForm.value).subscribe(data => {
      Swal.fire('success', 'Usuario registrado exitosamente!', 'success');
      this.route.navigate(['editProfile']);
    },error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
 console.log('datadssd', error);
    });
  }

}