import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre: string;
  description: string;
  id: any;
  imagesarray: any;

  public registerForm: FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, private authService: UserService) {
  }

  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      image: [''],
    });

    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.nombre = userparse.first_name;
    this.description = userparse.description;
    this.id = userparse.id;
    this.getImages();
  }

  public getImages() {
    const stack = [];
    this.authService.getImages(this.id).subscribe(data => {
      console.log("foto", data.profiles)
      const fotos = data.profiles;
      this.imagesarray = data
      if (fotos.length < 1) {
        Swal.fire({
  title: "Bienvenido a GoTogether!",
  text: "Antes de empezar, por favor actualiza tu descripcion y sube un par de fotos, asi tendras mas chance de hacer match!",
  icon: "info",
});

        stack.push('https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg')
        this.imagesarray = stack;
      } else {
        if(this.description!=""){

        }
        fotos.forEach(element =>
          stack.push(element.image));
        this.imagesarray = stack;
      }

    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  goToEdit() {
    this.route.navigate(['editProfile']);
  }

  subirImagen(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.get('image').setValue(reader.result.toString().split('base64,')[1]);
        this.authService.uploadImage(this.registerForm.value).subscribe(data => {
          Swal.fire('Success!', 'Foto subida correctamente', 'success');
          location.reload();
        }, error => {
          Swal.fire('Oops...', 'error en datos ingresados', 'error');
          console.log('datadssd', error);
        });

      }
    }
  }
}
