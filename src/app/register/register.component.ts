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
      birth_date: ['', [Validators.required]],
    });
  }

  registerUser(){
    this.registerForm.get("birth_date").setValue(this.registerForm.get("birth_date").value.toISOString().split('T')[0]);
    console.log("log",this.registerForm.value)
    this.authService.registerUser(this.registerForm.value).subscribe(data => {
          Swal.fire({
          title: "Bienvenido a GoTogether!",
          html: "Aqui puedes crear tu plan perfecto para salir con la persona perfecta.<br><br> No tienes un plan? no importa, " +
            "acá tambien puedes unirte a planes que han sido creados por otros",
          icon: "info",
        });
      this.route.navigate(['login']);
    },error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
 console.log('datadssd', error);
    });
  }

}
